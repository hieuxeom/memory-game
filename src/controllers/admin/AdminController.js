class AdminController {
	index(req, res) {
		return res.redirect("/admin/card-themes");
	}

	analytics(req, res) {
		return res.render("admin/analytics/index", {
			buttonBackRef: "/admin",
			listScripts: [
				{
					path: "admin/analytics/analytics.process.js",
					type: "module",
				},
			],
			layout: "layouts/admin",
		});
	}
}

module.exports = new AdminController();
