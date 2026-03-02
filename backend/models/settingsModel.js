const mongoose = require('mongoose');

/* default settings
{
    "showProfileStats": {
        "ShowElo": true,
        "ShowWL": true,
        "ShowDate": true
    },
    "_id": "69a54c8c83b53fa25e594136",
    "playerId": "69a54c8c83b53fa25e594132",
    "boardStyle": "GoldenCommon",
    "theme": true,
    "profilePic": "path/to/pfp.png",
    "createdAt": "2026-03-02T08:38:36.688Z",
    "updatedAt": "2026-03-02T08:38:36.688Z",
    "__v": 0
}
 */

/* example input PATCH api/settings/update
{
    "showProfileStats": {
        "ShowElo": false,
        "ShowWL": false,
        "ShowDate": false
    },
    "boardStyle": "Epic",
    "theme": true,
    "profilePic": "path/to/pfp.png"
}
*/

/* example output PATCH api/settings/update
{
    "showProfileStats": {
        "ShowElo": false,
        "ShowWL": false,
        "ShowDate": false
    },
    "_id": "69a54c8c83b53fa25e594136",
    "playerId": "69a54c8c83b53fa25e594132",
    "boardStyle": "Epic",
    "theme": true,
    "profilePic": "path/to/pfp.png",
    "createdAt": "2026-03-02T08:38:36.688Z",
    "updatedAt": "2026-03-02T08:41:02.527Z",
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