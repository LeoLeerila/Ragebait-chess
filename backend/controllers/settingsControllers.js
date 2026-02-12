const Settings = require('../models/settingsModel');
const mongoose = require("mongoose");

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
const getAllSettingss = async (req, res) => {
  try {
    const settingss = await Settings.find({}).sort({ createdAt: -1 });
    res.status(200).json(settingss);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve settingss" });
  }
};

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

// GET /settingss/:playerId
const getSettingsById = async (req, res) => {
  const { playerId } = req.params;

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

// PUT /settingss/:playerId
const updateSettings = async (req, res) => {
  const { playerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid settings ID" });
  }

  try {
    const updatedSettings = await Settings.findOneAndReplace(
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

module.exports = {
  getAllSettingss,
  getSettingsById,
  //createSettings,
  updateSettings,
  deleteSettings,
};

