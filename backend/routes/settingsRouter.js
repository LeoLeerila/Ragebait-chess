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
 
// GET /settingss
router.get("/", getAllSettingss);

// POST /settingss
router.post("/", createSettings); // Create new player Settings (run only once)

// GET /settingss/:settingsId
router.get("/:settingsId", getSettingsById);

// PUT /settingss/:settingsId
router.put("/:settingsId", updateSettings);

// DELETE /settingss/:settingsId
router.delete("/:settingsId", deleteSettings);

// Update settings using PATCH 
// router.patch('/:settingsId', patchSettings)

module.exports = router;

