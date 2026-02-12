const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statsSchema = new Schema({
  playerId: {
    type: String,
    required: true,
  },
  totalMatches: {
    type: Number,
    required: true,
  },
  wonMatches: {
    type: Number,
    required: true,
  },
  stalemateMatches: {
    type: Number,
    required: true,
  },
  aiForfeit: {
    type: Number,
    required: true,
  },
  currentELO: {
    type: Number,
    required: true,
  },
  highestELO: {
    type: Number,
    required: true,
  },
  checkmatePiece: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Stats', statsSchema);