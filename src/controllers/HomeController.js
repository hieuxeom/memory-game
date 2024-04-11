class HomeController {
	constructor() {}

	homepage(req, res, next) {
		const isNotLogin = !req.cookies._id;
		return res.render("index", {
			containerId: "homeContainer",
			listScripts: [
				{
					path: "home/home.process.js",
					type: "module",
				},
			],
			isNotLogin,
		});
	}
}

module.exports = new HomeController();
