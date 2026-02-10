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

