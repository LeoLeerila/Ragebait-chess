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

/* example input POST api/signup/
{
    "playerName": "Kaiffari",
    "password": "Xf1&8opq",
    "email": "kaiffari@kaiffaritOY.fi"
}
 */

/* example output POST api/signup/
{
    "email": "kaiffari@kaiffaritOY.fi",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWE1NGM4YzgzYjUzZmEyNWU1OTQxMzIiLCJpYXQiOjE3NzI0NDA3MTYsImV4cCI6MTc3MjY5OTkxNn0.5hxihhjFfyHuURLT5UPXIRxtALyFPQZwWe6EkF24YPg"
}
 */


// GET /players
//router.get("/", getAllPlayers);

// POST /signup
router.post("/signup", signup); //router.post("/", createPlayer); // Create new player

// POST /login
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

