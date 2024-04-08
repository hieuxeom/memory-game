const gameTopicModel = require("../../models/GameTopicModel");
const { Alphabets } = require("../../utils/alphabets");

class ApiGameTopicController {
	constructor() {
		this.getTopicsByQuery = this.getTopicsByQuery.bind(this);
	}

	getTopicsByQuery(req, res, next) {
		const { filter, _s } = req.query;

		if (_s) {
			return this.getTopicsBySearch(req, res, next);
		} else if (filter) {
			return this.getTopicsByFilter(req, res, next);
		} else {
			return this.getAllTopics(req, res, next);
		}
	}

	async getTopicsBySearch(req, res, next) {
		const { _s } = req.query;

		const gameThemeData = await gameTopicModel.find({
			themeName: {
				$regex: new RegExp(_s, "i"),
			},
		});
		if (gameThemeData.length > 0) {
			return res.status(200).json({
				status: "success",
				message: `Successfully received ${gameThemeData.length} game themes`,
				data: gameThemeData,
			});
		} else {
			return res.status(204).json({
				status: "success",
				message: "The request has been processed but there is no game themes to return",
			});
		}
	}

	async getTopicsByFilter(req, res, next) {
		const { filter } = req.query;

		const gameThemeData = await gameTopicModel.find({});

		switch (filter) {
			case "alphabets":
				let results = [];
				for (let x of Alphabets) {
					let regexFilter = new RegExp(` ^ [${x}${x.toLowerCase()}]`);
					results.push({
						title: x,
						data: gameThemeData.filter((card) => regexFilter.test(card.themeName)),
					});
				}
				return res.status(200).json({
					status: "success",
					message: `Successfully received ${gameThemeData.length} game themes sorted by A - Z`,
					data: results,
				});

			case "deleted":
				return res.status(200).json({
					status: "success",
					message: `Successfully received deleted game themes`,
					data: await gameTopicModel.find({
						isDeleted: true,
					}),
				});

			default:
				return res.status(200).json({
					status: "success",
					message: `Successfully received ${gameThemeData.length} game themes`,
					data: gameThemeData,
				});
		}
	}

	async getThemeById(req, res, next) {
		const { gameThemeId: themeId } = req.params;

		const gameThemeData = await gameTopicModel.findById(themeId);
		return res.status(200).json({
			status: "success",
			message: `Successfully received data of _id = ${gameThemeData._id}`,
			data: gameThemeData,
		});
	}

	async getAllTopics(req, res, next) {
		const findOptions = {};
		if (!req.headers.referer.includes("/admin")) {
			findOptions.isDeleted = false;
		}

		return res.status(200).json({
			status: "success",
			message: `Successfully received game topics data`,
			data: await gameTopicModel.find(findOptions),
		});
	}

	async getThemesVip(req, res, next) {
		const findOptions = {
			isVip: true,
		};

		if (!req.headers.referer.includes("/admin")) {
			findOptions.isDeleted = false;
		}

		const gameThemeData = await gameTopicModel.find(findOptions);

		return res.status(200).json({
			status: "success",
			message: `Successfully received ${gameThemeData.length} themes VIP`,
			data: gameThemeData,
		});
	}

	async createNewGameTheme(req, res, next) {
		try {
			if (!req.file) {
				return res.status(400).json({
					status: "fail",
					message: "Theme Thumbnail is required",
				});
			}

			const { filename } = req.file;
			let { themeName, themeDataParsed, rawData, themeDataType, isVip, price } = req.body;

			if (!themeDataParsed) {
				return res.status(400).json({
					status: "fail",
					message: "Theme Data is required",
				});
			}

			const newGameTheme = new gameTopicModel({
				themeName: themeName,
				themeData: JSON.parse(themeDataParsed),
				rawData: rawData,
				themeThumbnail: filename,
				type: themeDataType,
				isVip: Boolean(isVip),
				price: Number(price),
			});
			await newGameTheme.save();

			return res.status(201).json({
				status: "success",
				message: "New game theme successfully created",
			});
		} catch (err) {
			return res.status(503).json({
				status: "error",
				message: "There is a problem from the server",
				error: {
					name: err.name,
					message: err.message,
				},
			});
		}
	}

	async editGameTheme(req, res, next) {
		try {
			console.log("vcl");
			let { themeId, themeName, themeDataParsed, rawData, price, themeDataType } = req.body;

			let updateData = {
				themeName: themeName,
				themeData: JSON.parse(themeDataParsed),
				rawData: rawData,
				type: themeDataType,
				price: Number(price),
			};

			if (req.file) {
				updateData = {
					...updateData,
					themeThumbnail: req.file.filename,
				};
			}

			const editStatus = await gameTopicModel.findByIdAndUpdate(themeId, updateData);

			if (editStatus) {
				return res.status(200).json({
					status: "redirect",
					url: `/admin/game-topics/${themeId}`,
				});
			} else {
				return res.status(503).json({
					status: "error",
					message: "There is a problem from the server",
				});
			}
		} catch (err) {
			return res.status(503).json({
				status: "error",
				message: "There is a problem from the server",
				error: {
					name: err.name,
					message: err.message,
				},
			});
		}
	}

	async recoverTheme(req, res, next) {
		try {
			const { themeId } = req.params;

			const deleteStatus = await gameTopicModel.findByIdAndUpdate(themeId, {
				isDeleted: false,
			});

			if (deleteStatus) {
				return res.status(200).json({
					status: "redirect",
					url: "/admin/game-topics/all",
				});
			} else {
				return res.status(503).json({
					status: "error",
					message: "There is a problem from the server",
				});
			}
		} catch (err) {
			return res.status(503).json({
				status: "error",
				message: "There is a problem from the server",
				error: {
					name: err.name,
					message: err.message,
				},
			});
		}
	}

	async softDelete(req, res, next) {
		try {
			const { themeId } = req.params;
			console.log(themeId);

			const deleteStatus = await gameTopicModel.findByIdAndUpdate(themeId, {
				isDeleted: true,
			});

			if (deleteStatus) {
				return res.status(200).json({
					status: "redirect",
					url: "/admin/game-topics/all",
				});
			} else {
				return res.status(503).json({
					status: "error",
					message: "There is a problem from the server",
				});
			}
		} catch (err) {
			return res.status(503).json({
				status: "error",
				message: "There is a problem from the server",
				error: {
					name: err.name,
					message: err.message,
				},
			});
		}
	}

	async forceDelete(req, res, next) {
		try {
			const { themeId } = req.params;

			const deleteStatus = await gameTopicModel.findByIdAndDelete(themeId);

			if (deleteStatus) {
				return res.status(200).json({
					status: "redirect",
					url: "/admin/game-topics/all",
				});
			} else {
				return res.status(503).json({
					status: "error",
					message: "There is a problem from the server",
				});
			}
		} catch (err) {
			return res.status(503).json({
				status: "error",
				message: "There is a problem from the server",
				error: {
					name: err.name,
					message: err.message,
				},
			});
		}
	}
}

module.exports = new ApiGameTopicController();
