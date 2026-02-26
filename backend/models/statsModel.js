const mongoose = require('mongoose');

/* example input POST api/stats/
{
    "playerId": "698af30d0aa1dd526943bd8a",
    "totalMatches": 9001,
    "wonMatches": 1,
    "stalemateMatches": 0,
    "aiForfeit": 0,
    "currentELO": 1,
    "highestELO": 2,
    "checkmatePiece": "King"
}
*/

/* example output POST api/stats/
{
    "playerId": "698af30d0aa1dd526943bd8a",
    "totalMatches": 9001,
    "wonMatches": 1,
    "stalemateMatches": 0,
    "aiForfeit": 0,
    "currentELO": 1,
    "highestELO": 2,
    "checkmatePiece": "King",
    "_id": "698b26199e2678dc32942244",
    "createdAt": "2026-02-10T12:35:37.383Z",
    "updatedAt": "2026-02-10T12:35:37.383Z",
    "__v": 0
}
*/

const Schema = mongoose.Schema;

const statsSchema = new Schema({
  playerId: {
    type: String,
    required: true,
  },
  totalMatches: {
    type: Number,
    default: 0,
  },
  wonMatches: {
    type: Number,
    default: 0,
  },
  stalemateMatches: {
    type: Number,
    default: 0,
  },
  aiForfeit: {
    type: Number,
    default: 0,
  },
  currentELO: {
    type: Number,
    default: 0,
  },
  highestELO: {
    type: Number,
    default: 0,
  },
  checkmatePiece: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model('Stats', statsSchema);