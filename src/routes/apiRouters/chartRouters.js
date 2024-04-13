const express = require("express");
const router = express.Router();

const apiChart = require("../../controllers/api/ApiChartController");

router.get("/game-topics", apiChart.handleGameTheme);
router.get("/card-themes", apiChart.handleCardTheme);
router.get("/game-sizes", apiChart.handleGameSize);
router.get("/game-times", apiChart.handleGameTime);
router.get("/score-range", apiChart.handleScoreRange);
router.get("/highest-score-all-time", apiChart.handleLowToHighest);

module.exports = router;
