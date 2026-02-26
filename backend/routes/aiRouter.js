const express = require('express');
const router = express.Router();

const generateMoveText = require("../controllers/aiMoveController");

router.post('/generate-nxt-move', generateMoveText);

module.exports = router;