const express = require('express');
const router = express.Router();

const apiGameHistory = require("../../controllers/api/ApiGameHistoryController");

router.get("/", apiGameHistory.get);
router.get("/:userId", apiGameHistory.getPlayerGameHistory);

module.exports = router