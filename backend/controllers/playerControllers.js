const Player = require('../models/playerModel');
const mongoose = require("mongoose");

// GET /players
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({}).sort({ createdAt: -1 });
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve players" });
  }
};
 
// POST /players
const createPlayer = async (req, res) => {
  try {
    const newPlayer = await Player.create({ ...req.body });
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: "Failed to create player", error: error.message });
  }
};

// GET /players/:playerId
const getPlayerById = async (req, res) => {
  const { playerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid player ID" });
  }

  try {
    const player = await Player.findById(playerId);
    if (player) {
      res.status(200).json(player);
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve player" });
  }
};

// PUT /players/:playerId
const updatePlayer = async (req, res) => {
  const { playerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid player ID" });
  }

  try {
    const updatedPlayer = await Player.findOneAndReplace(
      { _id: playerId },
      { ...req.body },
      { new: true }
    );
    if (updatedPlayer) {
      res.status(200).json(updatedPlayer);
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update player" });
  }
};

// DELETE /players/:playerId
const deletePlayer = async (req, res) => {
  const { playerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid player ID" });
  }

  try {
    const deletedPlayer = await Player.findOneAndDelete({ _id: playerId });
    if (deletedPlayer) {
      res.status(200).json({ message: "Player deleted successfully" });
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete player" });
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

