const Player = require('../models/playerModel');
const Settings = require('../models/settingsModel');
const Stats = require('../models/statsModel');
const mongoose = require("mongoose");

// DEL /player
const deletePlayer = async (req, res) => {

    const { playerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(playerId)) {
        return res.status(400).json({ message: "Invalid player ID" });
    }

    try {
        const deletedPlayer = await Player.findOneAndDelete({ _id: playerId });

        //delete player settings
        await Stats.findOneAndDelete({ playerId });

        //delete player stats
        await Settings.findOneAndDelete({ playerId });

        res.status(201).json({ deletedPlayer });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete player", error: error.message });
    }
};

module.exports = deletePlayer;