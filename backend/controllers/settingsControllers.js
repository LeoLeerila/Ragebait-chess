const Settings = require('../models/settingsModel');
const mongoose = require("mongoose");

// GET /settingss
const getAllSettingss = async (req, res) => {
  try {
    const settingss = await Settings.find({}).sort({ createdAt: -1 });
    res.status(200).json(settingss);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve settingss" });
  }
};
 
// POST /settingss
const createSettings = async (req, res) => {
  try {
    const newSettings = await Settings.create({ ...req.body });
    res.status(201).json(newSettings);
  } catch (error) {
    res.status(400).json({ message: "Failed to create settings", error: error.message });
  }
};

// GET /settingss/:settingsId
const getSettingsById = async (req, res) => {
  const { settingsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(settingsId)) {
    return res.status(400).json({ message: "Invalid settings ID" });
  }

  try {
    const settings = await Settings.findById(settingsId);
    if (settings) {
      res.status(200).json(settings);
    } else {
      res.status(404).json({ message: "Settings not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve settings" });
  }
};

// PUT /settingss/:settingsId
const updateSettings = async (req, res) => {
  const { settingsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(settingsId)) {
    return res.status(400).json({ message: "Invalid settings ID" });
  }

  try {
    const updatedSettings = await Settings.findOneAndReplace(
      { _id: settingsId },
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

// DELETE /settingss/:settingsId
const deleteSettings = async (req, res) => {
  const { settingsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(settingsId)) {
    return res.status(400).json({ message: "Invalid settings ID" });
  }

  try {
    const deletedSettings = await Settings.findOneAndDelete({ _id: settingsId });
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
  createSettings,
  updateSettings,
  deleteSettings,
};

