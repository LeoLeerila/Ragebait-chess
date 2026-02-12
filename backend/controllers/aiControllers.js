const AiPreset = require('../models/aiPresetModel');
const mongoose = require("mongoose");

// GET /aiPresets
const getAllAiPresets = async (req, res) => {
  try {
    const aiPresets = await AiPreset.find({}).sort({ createdAt: -1 });
    res.status(200).json(aiPresets);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve aiPresets" });
  }
};
 
// POST /aiPresets
const createAiPreset = async (req, res) => {
  try {
    const newAiPreset = await AiPreset.create({ ...req.body });
    res.status(201).json(newAiPreset);
  } catch (error) {
    res.status(400).json({ message: "Failed to create aiPreset", error: error.message });
  }
};

// GET /aiPresets/:aiPresetId
const getAiPresetById = async (req, res) => {
  const { aiPresetId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(aiPresetId)) {
    return res.status(400).json({ message: "Invalid aiPreset ID" });
  }

  try {
    const aiPreset = await AiPreset.findById(aiPresetId);
    if (aiPreset) {
      res.status(200).json(aiPreset);
    } else {
      res.status(404).json({ message: "AiPreset not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve aiPreset" });
  }
};

// PUT /aiPresets/:aiPresetId
const updateAiPreset = async (req, res) => {
  const { aiPresetId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(aiPresetId)) {
    return res.status(400).json({ message: "Invalid aiPreset ID" });
  }

  try {
    const updatedAiPreset = await AiPreset.findOneAndReplace(
      { _id: aiPresetId },
      { ...req.body },
      { new: true }
    );
    if (updatedAiPreset) {
      res.status(200).json(updatedAiPreset);
    } else {
      res.status(404).json({ message: "AiPreset not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update aiPreset" });
  }
};

// DELETE /aiPresets/:aiPresetId
const deleteAiPreset = async (req, res) => {
  const { aiPresetId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(aiPresetId)) {
    return res.status(400).json({ message: "Invalid aiPreset ID" });
  }

  try {
    const deletedAiPreset = await AiPreset.findOneAndDelete({ _id: aiPresetId });
    if (deletedAiPreset) {
      res.status(200).json({ message: "AiPreset deleted successfully" });
    } else {
      res.status(404).json({ message: "AiPreset not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete aiPreset" });
  }
};

module.exports = {
  getAllAiPresets,
  getAiPresetById,
  createAiPreset,
  updateAiPreset,
  deleteAiPreset,
};

