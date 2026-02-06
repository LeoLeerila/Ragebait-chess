const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aiSchema = new Schema({
  aiName: {
    type: String,
    required: true,
  },
  systemPrompt: {
    type: String,
    required: true,
  },
  aiPic: {
    type: String,
    required: true,
  },
  aiELO: {
    type: Number,
    required: true,
  },
  aiDescription: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('AiPreset', aiSchema);