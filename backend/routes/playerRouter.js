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

 
// GET /players
router.get("/", getAllPlayers);

// POST /players
router.post("/", createPlayer); // Create new player

// GET /players/:playerId
router.get("/:playerId", getPlayerById);

// PUT /players/:playerId
router.put("/:playerId", updatePlayer);

// DELETE /players/:playerId
router.delete("/:playerId", deletePlayer);

// Update player using PATCH 
// router.patch('/:playerId', patchPlayer)

module.exports = router;

