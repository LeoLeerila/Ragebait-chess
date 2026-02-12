const mongoose = require('mongoose');

/* example input POST api/player/
{
    "playerName": "Kaiffari",
    "password": "securepassword",
    "email": "kaiffari@kaiffaritOY.fi"
}
 */

/* example output POST api/player/
{
    "playerName": "Kaiffari",
    "password": "securepassword",
    "email": "kaiffari@kaiffaritOY.fi",
    "_id": "698af30d0aa1dd526943bd8a",
    "createdAt": "2026-02-10T08:57:49.680Z",
    "updatedAt": "2026-02-10T08:57:49.680Z",
    "__v": 0
}
 */



const Schema = mongoose.Schema;

const playerSchema = new Schema({
  playerName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);