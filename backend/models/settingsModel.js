const mongoose = require('mongoose');

/* example input POST api/settings/
{
    "playerId": "698af30d0aa1dd526943bd8a",
    "boardStyle": "GoldenCommon",
    "theme": false,
    "profilePic": "path/to/pfp.png",
    "showProfileStats": "{ShowElo: true, ShowWL: true, ShowDate: true}"
}
*/

/* example output POST api/settings/
{
    "playerId": "698af30d0aa1dd526943bd8a",
    "boardStyle": "GoldenCommon",
    "theme": false,
    "profilePic": "path/to/pfp.png",
    "showProfileStats": "{ShowElo: true, ShowWL: true, ShowDate: true}",
    "_id": "698b24f05fdbb8c493af9612",
    "createdAt": "2026-02-10T12:30:40.042Z",
    "updatedAt": "2026-02-10T12:30:40.042Z",
    "__v": 0
}
*/

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  playerId: {
    type: String,
    required: true,
  },
  boardStyle: {
    type: String,
    default: "GoldenCommon",
  },
  theme: {
    type: Boolean,
    default: true,
  },
  profilePic: {
    type: String,
    default: "path/to/pfp.png",
  },
  showProfileStats: {
    ShowElo:{ type: Boolean, default: true}, 
    ShowWL: { type: Boolean, default: true},
    ShowDate: { type: Boolean, default: true}
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);