const Settings = require('../models/settingsModel');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


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

/* 
// GET /settingss
const getAllSettingss = async (req, res) => {
  try {
    const settingss = await Settings.find({}).sort({ createdAt: -1 });
    res.status(200).json(settingss);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve settingss" });
  }
};
 */

/* 
// POST /settingss
const createSettings = async (req, res) => {
  try {
    const newSettings = await Settings.create({ ...req.body });
    res.status(201).json(newSettings);
  } catch (error) {
    res.status(400).json({ message: "Failed to create settings", error: error.message });
  }
};
 */

// GET /settings/
const getSettingsById = async (req, res) => {
  const playerId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid settings ID" });
  }

  try {
    const settings = await Settings.findOne({playerId});
    if (settings) {
      res.status(200).json(settings);
    } else {
      res.status(404).json({ message: "Settings not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve settings" });
  }
};

// PUT /settings/update
const updateSettings = async (req, res) => {
  const playerId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid settings ID" });
  }

  try {
    const updatedSettings = await Settings.findOneAndUpdate(
      { playerId: playerId },
      { ...req.body },
      { new: true }
    );
    if (updatedSettings) {
      res.status(200).json(updatedSettings);
    } else {
      res.status(404).json({ message: "Settings not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update settings" });
  }
};

/* 
// DELETE /settingss/:playerId
const deleteSettings = async (req, res) => {
  const { playerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid settings ID" });
  }

  try {
    const deletedSettings = await Settings.findOneAndDelete({ playerId: playerId });
    if (deletedSettings) {
      res.status(200).json({ message: "Settings deleted successfully" });
    } else {
      res.status(404).json({ message: "Settings not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete settings" });
  }
};
 */

module.exports = {
  //getAllSettingss,
  getSettingsById,
  //createSettings,
  updateSettings,
  //deleteSettings,
};

