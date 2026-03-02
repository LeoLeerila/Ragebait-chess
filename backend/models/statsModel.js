const mongoose = require('mongoose');

/* default stats
{
    "_id": "69a54c8c83b53fa25e594134",
    "playerId": "69a54c8c83b53fa25e594132",
    "totalMatches": 0,
    "wonMatches": 0,
    "stalemateMatches": 0,
    "aiForfeit": 0,
    "currentELO": 0,
    "highestELO": 0,
    "checkmatePiece": "",
    "createdAt": "2026-03-02T08:38:36.687Z",
    "updatedAt": "2026-03-02T08:38:36.687Z",
    "__v": 0
}
 */

/* example input PATCH api/stats/update
{
    "totalMatches": 9001,
    "wonMatches": 1,
    "currentELO": 1,
    "highestELO": 1,
    "checkmatePiece": "King"
}
*/

/* example output PATCH api/stats/update
{
    "_id": "69a546bb46aa4543c800d2d0",
    "playerId": "69a546bb46aa4543c800d2ce",
    "totalMatches": 9001,
    "wonMatches": 1,
    "stalemateMatches": 0,
    "aiForfeit": 0,
    "currentELO": 1,
    "highestELO": 1,
    "checkmatePiece": "King",
    "createdAt": "2026-03-02T08:13:47.597Z",
    "updatedAt": "2026-03-02T08:14:36.545Z",
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