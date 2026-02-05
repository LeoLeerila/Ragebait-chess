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
 
// GET /statss
router.get("/", getAllStatss);

// POST /statss
router.post("/", createStats);

// GET /statss/:statsId
router.get("/:statsId", getStatsById);

// PUT /statss/:statsId
router.put("/:statsId", updateStats);

// DELETE /statss/:statsId
router.delete("/:statsId", deleteStats);

// Update stats using PATCH 
// router.patch('/:statsId', patchStats)

module.exports = router;

