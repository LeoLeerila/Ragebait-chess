const Player = require('../models/playerModel');
const Settings = require('../models/settingsModel');
const Stats = require('../models/statsModel');
const mongoose = require("mongoose");

/* const newStats = async (playerId) => {
    const newStats = await Stats.create({ playerId });
    return newStats
};

const newSettings = async (playerId) => {
    const newSettings = await Settings.create({ playerId });
    return newSettings
}; */

// POST /players
const newPlayer = async (req, res) => {
  try {
    const newPlayer = await Player.create({ ...req.body });
    const playerId = newPlayer._id
    
    //create player settings
    await Stats.create({ playerId });
    
    //create player stats
    await Settings.create({ playerId });

    res.status(201).json({newPlayer});
  } catch (error) {
    res.status(400).json({ message: "Failed to create player", error: error.message });
  }
};

module.exports = newPlayer;