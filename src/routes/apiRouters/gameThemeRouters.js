const express = require("express");
const multer = require("multer");
const router = express.Router();

const apiGameTheme = require("../../controllers/api/ApiGameThemeController");

const gameThemeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/game_thumbnails");
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, Date.now() + "-test" + "." + ext);
    },
});

const gameThemeUpload = multer({ storage: gameThemeStorage });

const gameThumbnailUpload = gameThemeUpload.single("themeThumbnail");

router.get("/vip", apiGameTheme.getThemesVip);
router.get("/:gameThemeId", apiGameTheme.getThemeById);
router.put("/:themeId/recover", apiGameTheme.recoverTheme);
router.put("/:themeId/delete", apiGameTheme.softDelete);
router.delete("/:themeId", apiGameTheme.forceDelete);
router.get("/", apiGameTheme.getAllGameThemes);
router.post("/", gameThumbnailUpload, apiGameTheme.createNewGameTheme);
router.put("/", gameThumbnailUpload, apiGameTheme.editGameTheme);

module.exports = router;