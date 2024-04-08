const cardThemeModel = require("../../models/CardThemeModel");

class AdminGameThemeController {
	index(req, res, next) {
		return res.render("admin/game-topics/showAll", {
			buttonBackRef: "/admin",
			listScripts: [
				{
					path: "admin/game-topics/main/main.process.js",
					type: "module",
				},
			],
			layout: "layouts/admin",
		});
	}

	add(req, res, next) {
		return res.render("admin/game-topics/addGameTopic", {
			buttonBackRef: "/",
			listScripts: [
				{
					path: "admin/game-topics/add/add.process.js",
					type: "module",
				},
			],
			layout: "layouts/admin",
		});
	}

	edit(req, res, next) {
		const { _id: themeId } = req.query;

		return res.render("admin/game-topics/editGameTopic", {
			buttonBackRef: "/",
			listScripts: [
				{
					path: "admin/game-topics/edit/edit.process.js",
					type: "module",
				},
			],
			layout: "layouts/admin",
			themeId,
		});
	}
	trash(req, res, next) {
		return res.render("admin/game-topics/showTrash", {
			buttonBackRef: "/",
			listScripts: [
				{
					path: "admin/game-topics/trash/trash.process.js",
					type: "module",
				},
			],
			layout: "layouts/admin",
		});
	}
}

module.exports = new AdminGameThemeController();
