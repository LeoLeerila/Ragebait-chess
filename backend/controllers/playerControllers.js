const Player = require('../models/playerModel');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Settings = require('../models/settingsModel');
const Stats = require('../models/statsModel');

/* example input POST api/player/
{
    "playerName": "Kaiffari",
    "password": "securepassword",
    "email": "kaiffari@kaiffaritOY.fi"
}
 */

/* example output POST api/player/
{
    "playerName": "Kaiffari",
    "password": "securepassword",
    "email": "kaiffari@kaiffaritOY.fi",
    "_id": "698af30d0aa1dd526943bd8a",
    "createdAt": "2026-02-10T08:57:49.680Z",
    "updatedAt": "2026-02-10T08:57:49.680Z",
    "__v": 0
}
 */


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const decodeToken = (authorization) => {
  const token = authorization.split(" ")[1];
  const { _id } = jwt.verify(token, process.env.SECRET);
  return _id
}

// login a player
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    const player = await Player.findOne({ email });
    if (!player) {
      throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, player.password);
    if (!match) {
      throw Error("Incorrect password");
    }

    // create a token
    const token = createToken(player._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a player
const signup = async (req, res) => {
  const { playerName, password, email } = req.body;

  try {
    // validation
    if (!email || !password || !playerName) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }
    const exists = await Player.findOne({ email });

    if (exists) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const player = await Player.create({ playerName, password: hash, email });
    const playerId = player._id

    //create player settings
    await Stats.create({ playerId });

    //create player stats
    await Settings.create({ playerId });

    // create a token
    const token = createToken(player._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// GET /players
/* const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({}).sort({ createdAt: -1 });
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve players" });
  }
}; */

/* 
// POST /players
const createPlayer = async (req, res) => {
  try {
    const newPlayer = await Player.create({ ...req.body });
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: "Failed to create player", error: error.message });
  }
};
 */

// GET /players/:playerId
/* const getPlayerById = async (req, res) => {
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
}; */

// PUT /players/:playerId
const updatePlayer = async (req, res) => {
  const { authorization } = req.headers;

  const playerId = decodeToken(authorization)

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid player ID" });
  }

  try {

    if (req.body.password) {
      if (!validator.isStrongPassword(req.body.password)) {
        throw Error("Password not strong enough");
      }
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      req.body.password = password
    }

    if (req.body.email) {
      const email = req.body.email
      if (!validator.isEmail(email)) {
        throw Error("Email not valid");
      }
      const exists = await Player.findOne({ email });
      if (exists) {
        throw Error("Email already in use");
      }
    }

    const updatedPlayer = await Player.findOneAndReplace(
      { _id: playerId },
      { ...req.body },
      { new: true }
    );
    if (updatedPlayer) {
      // create a token
      const token = createToken(updatedPlayer._id);
      res.status(200).json(updatedPlayer.playerName);
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to update player" });
  }
};

// DELETE /players/:playerId
/* const deletePlayer = async (req, res) => {
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
}; */

// DEL /player
const deletePlayer = async (req, res) => {

  const { authorization } = req.headers;

  const playerId = decodeToken(authorization)

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: "Invalid player ID" });
  }

  try {
    const deletedPlayer = await Player.findOneAndDelete({ _id: playerId });

    //delete player settings
    await Stats.findOneAndDelete({ playerId });

    //delete player stats
    await Settings.findOneAndDelete({ playerId });

    if (deletedPlayer) {
      res.status(200).json({ message: "Player deleted successfully" });
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to delete player", error: error.message });
  }
};

module.exports = {
  signup,
  login,
  //getAllPlayers,
  //getPlayerById,
  //createPlayer,
  updatePlayer,
  deletePlayer,
};

