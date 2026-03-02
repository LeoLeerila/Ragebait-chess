const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    //getAllPlayers,
    //getPlayerById,
    //createPlayer,
    updatePlayer,
    deletePlayer,
    // patchPlayer
} = require("../controllers/playerControllers");
//const deletePlayer = require("../controllers/deletePlayerControllers")
const requireAuth = require("../middleware/requireAuth");

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
//router.get("/", getAllPlayers);

// POST /players
router.post("/signup", signup); //router.post("/", createPlayer); // Create new player

// POST /players
router.post("/login", login)

// GET /players/:playerId
//router.get("/:playerId", getPlayerById);

router.use(requireAuth);

// PUT /players/:playerId
router.put("/", updatePlayer);

// DELETE /players/:playerId
router.delete("/", deletePlayer);

// Update player using PATCH 
// router.patch('/:playerId', patchPlayer)

module.exports = router;

