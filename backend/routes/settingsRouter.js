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
 
// GET /settingss
router.get("/", getAllSettingss);

// POST /settingss
//router.post("/", createSettings); // Create new player Settings (run only once)

// GET /settingss/:settingsId
router.get("/:settingsId", getSettingsById);

// PUT /settingss/:settingsId
router.put("/:settingsId", updateSettings);

// DELETE /settingss/:settingsId
router.delete("/:settingsId", deleteSettings);

// Update settings using PATCH 
// router.patch('/:settingsId', patchSettings)

module.exports = router;

