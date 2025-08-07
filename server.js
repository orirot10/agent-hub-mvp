const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Conversation = require('./models/Conversation');
const Agent = require('./models/Agent');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'GWG',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.post('/api/conversations', async (req, res) => {
  try {
    const { userId, title, content, type } = req.body;
    const conversation = new Conversation({ userId, title, content, type });
    const saved = await conversation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save conversation', details: error.message });
  }
});

app.get('/api/conversations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({ userId }).sort({ createdAt: -1 });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations', details: error.message });
  }
});

app.post('/api/agents', async (req, res) => {
  try {
    const { name, role, description } = req.body;
    const agent = new Agent({ name, role, description });
    const saved = await agent.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save agent', details: error.message });
  }
});

app.get('/api/agents', async (req, res) => {
  try {
    const agents = await Agent.find().sort({ createdAt: -1 });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
