const express = require("express");
const multer = require("multer");
const router = express.Router();

const apiCardTheme = require("../../controllers/api/ApiCardThemeController");

const cardThemeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/themepacks");
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, Date.now() + "" + "." + ext);
    },
});

const cardThemeUpload = multer({ storage: cardThemeStorage });

const multiCardUpload = cardThemeUpload.fields([
    { name: "cardFront", maxCount: 1 },
    { name: "cardBack", maxCount: 1 },
]);

router.get("/vip", apiCardTheme.getThemesVip);
router.get("/:themeId", apiCardTheme.getThemeById);
router.put("/:themeId/recover", apiCardTheme.recoverTheme);
router.put("/:themeId/delete", apiCardTheme.softDeleted);
router.delete("/:themeId", apiCardTheme.forceDeleted)
router.get("/", apiCardTheme.getThemesByQuery);
router.post("/", multiCardUpload, apiCardTheme.createNewCardTheme);
router.put("/", multiCardUpload, apiCardTheme.editCardTheme);

module.exports = router;