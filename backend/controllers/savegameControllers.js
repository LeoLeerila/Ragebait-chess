const Savegame = require('../models/savegameModel');
const mongoose = require("mongoose");

// GET /savegames
const getAllSavegames = async (req, res) => {
  try {
    const savegames = await Savegame.find({}).sort({ createdAt: -1 });
    res.status(200).json(savegames);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve savegames" });
  }
};
 
// POST /savegames
const createSavegame = async (req, res) => {
  try {
    const newSavegame = await Savegame.create({ ...req.body });
    res.status(201).json(newSavegame);
  } catch (error) {
    res.status(400).json({ message: "Failed to create savegame", error: error.message });
  }
};

// GET /savegames/:savegameId
const getSavegameById = async (req, res) => {
  const { savegameId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(savegameId)) {
    return res.status(400).json({ message: "Invalid savegame ID" });
  }

  try {
    const savegame = await Savegame.findById(savegameId);
    if (savegame) {
      res.status(200).json(savegame);
    } else {
      res.status(404).json({ message: "Savegame not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve savegame" });
  }
};

// PUT /savegames/:savegameId
const updateSavegame = async (req, res) => {
  const { savegameId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(savegameId)) {
    return res.status(400).json({ message: "Invalid savegame ID" });
  }

  try {
    const updatedSavegame = await Savegame.findOneAndReplace(
      { _id: savegameId },
      { ...req.body },
      { new: true }
    );
    if (updatedSavegame) {
      res.status(200).json(updatedSavegame);
    } else {
      res.status(404).json({ message: "Savegame not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update savegame" });
  }
};

// DELETE /savegames/:savegameId
const deleteSavegame = async (req, res) => {
  const { savegameId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(savegameId)) {
    return res.status(400).json({ message: "Invalid savegame ID" });
  }

  try {
    const deletedSavegame = await Savegame.findOneAndDelete({ _id: savegameId });
    if (deletedSavegame) {
      res.status(200).json({ message: "Savegame deleted successfully" });
    } else {
      res.status(404).json({ message: "Savegame not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete savegame" });
  }
};

module.exports = {
  getAllSavegames,
  getSavegameById,
  createSavegame,
  updateSavegame,
  deleteSavegame,
};

