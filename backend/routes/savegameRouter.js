const express = require("express");
const router = express.Router();
const {
  getAllSavegames,
  getSavegameById,
  createSavegame,
  updateSavegame,
  deleteSavegame,
  // patchSavegame
} = require("../controllers/savegameControllers");
 
// GET /savegames
router.get("/", getAllSavegames);

// POST /savegames
router.post("/", createSavegame);

// GET /savegames/:savegameId
router.get("/:savegameId", getSavegameById);

// PUT /savegames/:savegameId
router.put("/:savegameId", updateSavegame);

// DELETE /savegames/:savegameId
router.delete("/:savegameId", deleteSavegame);

// Update savegame using PATCH 
// router.patch('/:savegameId', patchSavegame)

module.exports = router;

