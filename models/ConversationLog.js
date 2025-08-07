const { Schema, model, models } = require('mongoose');

const messageSchema = new Schema({
  role: { type: String, enum: ['user', 'agent'], required: true },
  agentId: { type: String },
  content: { type: String, required: true },
  timestamp: { type: Number, required: true }
});

const conversationSchema = new Schema({
  conversationId: { type: String, required: true, unique: true },
  timestamp: { type: Number, required: true },
  messages: [messageSchema]
});

module.exports = models.ConversationLog || model('ConversationLog', conversationSchema, 'conversations');
