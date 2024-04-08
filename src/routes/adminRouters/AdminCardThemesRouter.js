const express = require("express");
const router = express.Router();

const adminCardThemeController = require("../../controllers/admin/AdminCardThemesController");

router.get("/", adminCardThemeController.index);
router.get("/all", adminCardThemeController.index);
router.get("/add", adminCardThemeController.add);
router.get("/edit", adminCardThemeController.edit);
router.get("/trash", adminCardThemeController.trash);

module.exports = router;
