const express = require("express");
const router = express.Router();
const {
  getAllStats,
  getStatsById,
  createStats,
  updateStats,
  deleteStats,
  // patchStats
} = require("../controllers/statsControllers");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

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
 
// GET /stats
//router.get("/", getAllStats);

// POST /stats
//router.post("/", createStats); // Create new player Stats (run only once)

// GET /stats/:playerId
router.get("/", getStatsById);

// PUT /stats/:playerId
router.patch("/update", updateStats);

// DELETE /stats/:playerId
//router.delete("/:playerId", deleteStats);

// Update stats using PATCH 
// router.patch('/:statsId', patchStats)

module.exports = router;

