const Stats = require('../models/statsModel');
const mongoose = require("mongoose");

/* example input POST api/stats/
{
    "playerId": "698af30d0aa1dd526943bd8a",
    "totalMatches": 9001,
    "wonMatches": 1,
    "stalemateMatches": 0,
    "aiForfeit": 0,
    "currentELO": 1,
    "highestELO": 2,
    "checkmatePiece": "King"
}
*/

/* example output POST api/stats/
{
    "playerId": "698af30d0aa1dd526943bd8a",
    "totalMatches": 9001,
    "wonMatches": 1,
    "stalemateMatches": 0,
    "aiForfeit": 0,
    "currentELO": 1,
    "highestELO": 2,
    "checkmatePiece": "King",
    "_id": "698b26199e2678dc32942244",
    "createdAt": "2026-02-10T12:35:37.383Z",
    "updatedAt": "2026-02-10T12:35:37.383Z",
    "__v": 0
}
*/

// GET /statss
const getAllStats = async (req, res) => {
  try {
    const statss = await Stats.find({}).sort({ createdAt: -1 });
    res.status(200).json(statss);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve statss" });
  }
};

/* 
// POST /statss
const createStats = async (req, res) => {
  try {
    const newStats = await Stats.create({ ...req.body });
    res.status(201).json(newStats);
  } catch (error) {
    res.status(400).json({ message: "Failed to create stats", error: error.message });
  }
};
 */

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
  getAllStats,
  getStatsById,
  //createStats,
  updateStats,
  deleteStats,
};

