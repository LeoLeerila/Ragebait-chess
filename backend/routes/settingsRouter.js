const express = require("express");
const router = express.Router();
const {
  getAllSettingss,
  getSettingsById,
  createSettings,
  updateSettings,
  deleteSettings,
  // patchSettings
} = require("../controllers/settingsControllers");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

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
 
// GET /settingss
//router.get("/", getAllSettingss);

// POST /settingss
//router.post("/", createSettings); // Create new player Settings (run only once)

// GET /settings/
router.get("/", getSettingsById);

// PUT /settings/
router.patch("/update", updateSettings);

// DELETE /settingss/:playerId
//router.delete("/:playerId", deleteSettings);

// Update settings using PATCH 
// router.patch('/:settingsId', patchSettings)

module.exports = router;

