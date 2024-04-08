const express = require('express');
const router = express.Router();

const adminCardThemeRouter = require("./adminRouters/AdminCardThemesRouter")
const adminGameTopicRouter = require("./adminRouters/AdminGameTopicsRouter")

const adminController = require("../controllers/admin/AdminController");

router.use("/card-themes", adminCardThemeRouter);
router.use("/game-topics", adminGameTopicRouter);

router.get("/", adminController.index);
router.get("/analytics", adminController.analytics);


module.exports = router