const express = require("express");
const router = express.Router();
const {
  getAllStatss,
  getStatsById,
  createStats,
  updateStats,
  deleteStats,
  // patchStats
} = require("../controllers/statsControllers");

/* example input POST api/stats/
{
    "playerId": "698af30d0aa1dd526943bd8a",
    "totalMatches": 9001,
    "wonMatches": 1,
    "stalemateMatches": 0,
    "aiForfeit": 0,
    "currentELO": 1,
    "highestELO": 2,
    "checkmatePiece": "King"
}
*/

/* example output POST api/stats/
{
    "playerId": "698af30d0aa1dd526943bd8a",
    "totalMatches": 9001,
    "wonMatches": 1,
    "stalemateMatches": 0,
    "aiForfeit": 0,
    "currentELO": 1,
    "highestELO": 2,
    "checkmatePiece": "King",
    "_id": "698b26199e2678dc32942244",
    "createdAt": "2026-02-10T12:35:37.383Z",
    "updatedAt": "2026-02-10T12:35:37.383Z",
    "__v": 0
}
*/
 
// GET /stats
router.get("/", getAllStatss);

// POST /stats
router.post("/", createStats); // Create new player Stats (run only once)

// GET /stats/:statsId
router.get("/:statsId", getStatsById);

// PUT /stats/:statsId
router.put("/:statsId", updateStats);

// DELETE /stats/:statsId
router.delete("/:statsId", deleteStats);

// Update stats using PATCH 
// router.patch('/:statsId', patchStats)

module.exports = router;

