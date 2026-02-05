const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const savegameSchema = new Schema({
  playerId: {
    type: String,
    required: true,
  },
  boardState: {
    type: String,
    required: true,
  },
  moveHistory: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  chatHistory: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Savegame', savegameSchema);