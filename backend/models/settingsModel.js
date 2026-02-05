const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  playerId: {
    type: String,
    required: true,
  },
  boardStyle: {
    type: String,
    required: true,
  },
  theme: {
    type: Boolean,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);