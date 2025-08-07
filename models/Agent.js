const { Schema, model } = require('mongoose');

const agentSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Agent', agentSchema);
