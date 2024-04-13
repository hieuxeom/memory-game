const gameThemeModel = require("../../models/GameTopicModel");
const cardThemeModel = require("../../models/CardThemeModel");
const historyGameModel = require("../../models/HistoryGameModel");

class ApiChartController {
	async handleGameTheme(req, res, next) {
		const gameData = await gameThemeModel.find({});
		let labels = [];
		let data = [];
		gameData.forEach(({ themeName, played }) => {
			labels.push(themeName);
			data.push(played);
		});

		return res.status(200).json({
			status: "success",
			data: {
				labels,
				data,
			},
		});
	}

	async handleCardTheme(req, res, next) {
		const cardData = await cardThemeModel.find({});
		let labels = [];
		let data = [];

		cardData.forEach(({ themeName, used }) => {
			labels.push(themeName);
			data.push(used);
		});

		return res.status(200).json({
			status: "success",
			data: {
				labels,
				data,
			},
		});
	}

	async handleGameSize(req, res, next) {
		const size4x4 = await historyGameModel.find({
			gameSize: "4x4",
		});
		const size4x5 = await historyGameModel.find({
			gameSize: "4x5",
		});

		let labels = ["4x4", "4x5"];
		let data = [size4x4.length, size4x5.length];

		return res.status(200).json({
			status: "success",
			data: {
				labels,
				data,
			},
		});
	}

	async handleGameTime(req, res, next) {
		const time60 = await historyGameModel.find({
			gameTime: 60,
		});
		const time120 = await historyGameModel.find({
			gameTime: 120,
		});
		const time300 = await historyGameModel.find({
			gameTime: 300,
		});

		let labels = ["60s", "120s", "300s"];
		let data = [time60.length, time120.length, time300.length];

		return res.status(200).json({
			status: "success",
			data: {
				labels,
				data,
			},
		});
	}
	async handleScoreRange(req, res, next) {
		const aggregateData = await historyGameModel.aggregate([
			{
				$group: {
					_id: {
						$dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
					},
					gameScore: { $max: "$gameScore" },
				},
			},
			{
				$sort: {
					_id: 1, // Sort by date in ascending order
				},
			},
		]);

		const labels = [];
		const data = [];

		const result = aggregateData.forEach(({ _id, gameScore }) => {
			console.log(_id, gameScore);
			labels.push(_id);
			data.push(gameScore);
		});

		return res.status(200).json({
			status: "success",
			data: {
				labels,
				data,
			},
		});
	}

	async handleLowToHighest(req, res, next) {
		const aggregateData = await historyGameModel.aggregate([
			{
				$group: {
					_id: {
						$dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
					},
					gameScore: { $max: "$gameScore" },
				},
			},
			{
				$sort: {
					_id: 1, // Sort by date in ascending order
				},
			},
		]);

		const labels = [];
		const data = [];

		let currentHighest = 0;
		aggregateData.forEach(({ _id, gameScore }) => {
			labels.push(_id);
			if (gameScore > currentHighest) {
				data.push(gameScore);
				currentHighest = gameScore;
			} else {
				data.push(currentHighest);
			}
		});

		return res.status(200).json({
			status: "success",
			data: {
				labels,
				data,
			},
		});
	}
}

module.exports = new ApiChartController();
