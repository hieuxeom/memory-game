class UserController {
	index(req, res, next) {
		return res.render("profile/index", {
			containerId: "authContainer",
			listScripts: [
				{
					path: "profile/profile.process.js",
					type: "module",
				},
			],
		});
	}

	history(req, res, next) {
		return res.render("profile/history", {
			containerId: "siteContainer",
			title: "Game History",
			buttonBackRef: "/profile",
			listScripts: [
				{
					path: "profile/history/history.process.js",
					type: "module",
				},
			],
		});
	}

	changePassword(req, res, next) {
		return res.render("profile/change-password", {
			containerId: "siteContainer",
			title: "Change Password",
			buttonBackRef: "/profile",
			listScripts: [
				{
					path: "profile/change-password.js",
					type: "module",
				},
			],
		});
	}
}

module.exports = new UserController();
