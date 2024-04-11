class GameController {
	constructor() {}

	config(req, res, next) {
		return res.render("game/config", {
			containerId: "siteContainer",
			listScripts: [
				{
					path: "game/config-board/game.process.js",
					type: "module",
				},
			],
		});
	}

	play(req, res, next) {
		const { gameMode } = req.cookies;

		const isHardCoreMode = gameMode === "hardcore";
		console.log("🚀 ~ GameController ~ play ~ isHardCoreMode:", isHardCoreMode);

		return res.render("game/play", {
			containerId: "siteContainer",
			listScripts: [
				{
					path: "game/play-board/game.process.js",
					type: "module",
				},
			],
			isHardCoreMode,
		});
	}
}

module.exports = new GameController();
