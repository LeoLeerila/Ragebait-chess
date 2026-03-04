const Stats = require('../models/statsModel');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


/* default stats
{
    "_id": "69a54c8c83b53fa25e594134",
    "playerId": "69a54c8c83b53fa25e594132",
    "totalMatches": 0,
    "wonMatches": 0,
    "stalemateMatches": 0,
    "aiForfeit": 0,
    "currentELO": 0,
    "highestELO": 0,
    "checkmatePiece": "",
    "createdAt": "2026-03-02T08:38:36.687Z",
    "updatedAt": "2026-03-02T08:38:36.687Z",
    "__v": 0
}
 */

/* example input PATCH api/stats/update
{
    "totalMatches": 9001,
    "wonMatches": 1,
    "currentELO": 1,
    "highestELO": 1,
    "checkmatePiece": "King"
}
*/

/* example output PATCH api/stats/update
{
    "_id": "69a546bb46aa4543c800d2d0",
    "playerId": "69a546bb46aa4543c800d2ce",
    "totalMatches": 9001,
    "wonMatches": 1,
    "stalemateMatches": 0,
    "aiForfeit": 0,
    "currentELO": 1,
    "highestELO": 1,
    "checkmatePiece": "King",
    "createdAt": "2026-03-02T08:13:47.597Z",
    "updatedAt": "2026-03-02T08:14:36.545Z",
    "__v": 0
}
*/

/* 
// GET /statss
const getAllStats = async (req, res) => {
  try {
    const statss = await Stats.find({}).sort({ createdAt: -1 });
    res.status(200).json(statss);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve statss" });
  }
};
 */

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

// GET /statss/:playerId
const getStatsById = async (req, res) => {
  const playerId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid stats ID" });
  }

  try {
    const stats = await Stats.findOne({playerId});
    if (stats) {
      res.status(200).json(stats);
    } else {
      res.status(404).json({ message: "Stats not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve stats" });
  }
};

// PUT /statss/:playerId
const updateStats = async (req, res) => {
  const playerId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid stats ID" });
  }

  try {
    const updatedStats = await Stats.findOneAndUpdate(
      { playerId: playerId },
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

/* 
// DELETE /statss/:playerId
const deleteStats = async (req, res) => {
  const { playerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid stats ID" });
  }

  try {
    const deletedStats = await Stats.findOneAndDelete({ playerId: playerId });
    if (deletedStats) {
      res.status(200).json({ message: "Stats deleted successfully" });
    } else {
      res.status(404).json({ message: "Stats not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete stats" });
  }
};
 */

module.exports = {
  //getAllStats,
  getStatsById,
  //createStats,
  updateStats,
  //deleteStats,
};

