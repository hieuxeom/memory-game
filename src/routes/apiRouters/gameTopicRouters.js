const express = require("express");
const multer = require("multer");
const router = express.Router();

const apiGameTopic = require("../../controllers/api/ApiGameTopicController");

const gameTopicStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/images/game_thumbnails");
	},
	filename: function (req, file, cb) {
		let ext = file.mimetype.split("/")[1];
		cb(null, Date.now() + "-test" + "." + ext);
	},
});

const gameThemeUpload = multer({ storage: gameTopicStorage });

const gameThumbnailUpload = gameThemeUpload.single("themeThumbnail");

router.get("/", apiGameTopic.getTopicsByQuery);
router.get("/vip", apiGameTopic.getThemesVip);
router.get("/:gameThemeId", apiGameTopic.getThemeById);
router.put("/:themeId/recover", apiGameTopic.recoverTheme);
router.put("/:themeId/delete", apiGameTopic.softDelete);
router.delete("/:themeId", apiGameTopic.forceDelete);
router.post("/", gameThumbnailUpload, apiGameTopic.createNewGameTheme);
router.put("/", gameThumbnailUpload, apiGameTopic.editGameTheme);

module.exports = router;
