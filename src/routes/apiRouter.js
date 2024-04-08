const express = require("express");
const router = express.Router();

const cardThemeRouters = require("./apiRouters/cardThemeRouters");
const gameTopicRouters = require("./apiRouters/gameTopicRouters");
const authRouters = require("./apiRouters/authRouters");
const userRouters = require("./apiRouters/userRouters");
const gameResultRouters = require("./apiRouters/gameResultRouters");
const gameHistoryRouters = require("./apiRouters/gameHistoryRouters");
const chartRouters = require("./apiRouters/chartRouters");
const rankRouters = require("./apiRouters/rankRouters");
const shopRouters = require("./apiRouters/shopRouters");

router.use("/card-themes", cardThemeRouters);
router.use("/game-topics", gameTopicRouters);
router.use("/auth", authRouters);
router.use("/users", userRouters);
router.use("/game-results", gameResultRouters);
router.use("/game-history", gameHistoryRouters);
router.use("/charts", chartRouters);
router.use("/ranks", rankRouters);
router.use("/shop", shopRouters);

module.exports = router;
