const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aiSchema = new Schema({
  aiName: {
    type: String,
    required: true,
    unique: true
  },
  systemPrompt: {
    type: String,
    required: true,
  },
  aiPic: {
    type: String,
    required: true,
  },
  aistats: {
    ELO: {
      type: Number,
      required: true,
    },
    Depth: {
      type: Number,
      required: true,
    },
    Skill: {
      type: Number,
      required: true,
    },
  },
  aiDescription: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('AiPreset', aiSchema);