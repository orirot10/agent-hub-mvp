const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['markdown', 'log'], default: 'markdown' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Conversation', conversationSchema);
