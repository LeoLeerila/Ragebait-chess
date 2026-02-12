const Stats = require('../models/statsModel');
const mongoose = require("mongoose");

// GET /statss
const getAllStatss = async (req, res) => {
  try {
    const statss = await Stats.find({}).sort({ createdAt: -1 });
    res.status(200).json(statss);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve statss" });
  }
};
 
// POST /statss
const createStats = async (req, res) => {
  try {
    const newStats = await Stats.create({ ...req.body });
    res.status(201).json(newStats);
  } catch (error) {
    res.status(400).json({ message: "Failed to create stats", error: error.message });
  }
};

// GET /statss/:statsId
const getStatsById = async (req, res) => {
  const { statsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(statsId)) {
    return res.status(400).json({ message: "Invalid stats ID" });
  }

  try {
    const stats = await Stats.findById(statsId);
    if (stats) {
      res.status(200).json(stats);
    } else {
      res.status(404).json({ message: "Stats not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve stats" });
  }
};

// PUT /statss/:statsId
const updateStats = async (req, res) => {
  const { statsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(statsId)) {
    return res.status(400).json({ message: "Invalid stats ID" });
  }

  try {
    const updatedStats = await Stats.findOneAndReplace(
      { _id: statsId },
      { ...req.body },
      { new: true }
    );
    if (updatedStats) {
      res.status(200).json(updatedStats);
    } else {
      res.status(404).json({ message: "Stats not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update stats" });
  }
};

// DELETE /statss/:statsId
const deleteStats = async (req, res) => {
  const { statsId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(statsId)) {
    return res.status(400).json({ message: "Invalid stats ID" });
  }

  try {
    const deletedStats = await Stats.findOneAndDelete({ _id: statsId });
    if (deletedStats) {
      res.status(200).json({ message: "Stats deleted successfully" });
    } else {
      res.status(404).json({ message: "Stats not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete stats" });
  }
};

module.exports = {
  getAllStatss,
  getStatsById,
  createStats,
  updateStats,
  deleteStats,
};

