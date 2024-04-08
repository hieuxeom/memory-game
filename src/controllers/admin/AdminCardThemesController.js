const cardThemeModel = require("../../models/CardThemeModel");

class AdminCardThemeController {
	index(req, res, next) {
		return res.render("admin/card-themes/showAll", {
			buttonBackRef: "/",
			listScripts: [
				{
					path: "admin/card-themes/main/main.process.js",
					type: "module",
				},
			],
			layout: "layouts/admin",
		});
	}

	add(req, res, next) {
		return res.render("admin/card-themes/addCardTheme", {
			buttonBackRef: "/",
			listScripts: [
				{
					path: "/admin/card-themes/add/add.process.js",
					type: "module",
				},
			],
			layout: "layouts/admin",
		});
	}

	edit(req, res, next) {
		const { _id: themeId } = req.query;

		return res.render("admin/card-themes/editCardTheme", {
			buttonBackRef: "/",
			listScripts: [
				{
					path: "admin/card-themes/edit/edit.process.js",
					type: "module",
				},
			],
			themeId,
			layout: "layouts/admin",
		});
	}

	trash(req, res, next) {
		return res.render("admin/card-themes/showTrash", {
			buttonBackRef: "/",
			listScripts: [
				{
					path: "admin/card-themes/trash/trash.process.js",
					type: "module",
				},
			],
			layout: "layouts/admin",
		});
	}
}

module.exports = new AdminCardThemeController();
