class RankController {
	index(req, res, next) {
		return res.render("rank/index", {
			containerId: "siteContainer",
			class: "px-8 py-2",
			title: "Ranking Board",
			buttonBackRef: "/",
			listScripts: [
				{
					path: "/ranking/rank.process.js",
					type: "module",
				},
			],
		});
	}
}

module.exports = new RankController();
