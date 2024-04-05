const express = require('express');
const router = express.Router();

const apiChart = require("../../controllers/api/ApiChartController");

router.get("/game-themes", apiChart.handleGameTheme);
router.get("/card-themes", apiChart.handleCardTheme);
router.get("/game-sizes", apiChart.handleGameSize);
router.get("/game-times", apiChart.handleGameTime);

module.exports = router