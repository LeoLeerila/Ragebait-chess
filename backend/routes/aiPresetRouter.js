const express = require("express");
const router = express.Router();
const {
  getAllAiPresets,
  getAiPresetById,
  createAiPreset,
  updateAiPreset,
  deleteAiPreset,
  // patchAiPreset
} = require("../controllers/aiPresetControllers");
 
// GET /aiPresets
router.get("/", getAllAiPresets);

// POST /aiPresets
router.post("/", createAiPreset); // create new aipreset

// GET /aiPresets/:aiPresetId
router.get("/:aiPresetId", getAiPresetById);

// PUT /aiPresets/:aiPresetId
router.put("/:aiPresetId", updateAiPreset);

// DELETE /aiPresets/:aiPresetId
router.delete("/:aiPresetId", deleteAiPreset);

// Update aiPreset using PATCH 
// router.patch('/:aiPresetId', patchAiPreset)

module.exports = router;

