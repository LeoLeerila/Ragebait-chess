const express = require("express");
const router = express.Router();
const {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  // patchPlayer
} = require("../controllers/playerControllers");
 
// GET /players
router.get("/", getAllPlayers);

// POST /players
router.post("/", createPlayer);

// GET /players/:playerId
router.get("/:playerId", getPlayerById);

// PUT /players/:playerId
router.put("/:playerId", updatePlayer);

// DELETE /players/:playerId
router.delete("/:playerId", deletePlayer);

// Update player using PATCH 
// router.patch('/:playerId', patchPlayer)

module.exports = router;

