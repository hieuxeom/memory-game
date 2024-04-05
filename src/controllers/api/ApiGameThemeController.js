const gameThemeModel = require("../../models/GameThemeModel");
const { Alphabets } = require("../../utils/alphabets");

class ApiGameThemeController {
	async getAllGameThemes(req, res, next) {
		const { filter, _s } = req.query;

		if (_s) {
			const gameThemeData = await gameThemeModel.find({
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

		const gameThemeData = await gameThemeModel.find({});

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

		const gameThemeData = await gameThemeModel.findById(themeId);
		return res.status(200).json({
			status: "success",
			message: `Successfully received data of _id = ${gameThemeData._id}`,
			data: gameThemeData,
		});
	}

	async getThemesVip(req, res, next) {
		const gameThemeData = await gameThemeModel.find({
			isVip: true,
		});

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

			const newGameTheme = new gameThemeModel({
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
			let { themeId, themeName, themeDataParsed, rawData, themeDataType } = req.body;

			let updateData = {
				themeName: themeName,
				themeData: JSON.parse(themeDataParsed),
				rawData: rawData,
				type: themeDataType,
			};

			if (req.file) {
				updateData = {
					...updateData,
					themeThumbnail: req.file.filename,
				};
			}

			const editStatus = await gameThemeModel.findByIdAndUpdate(themeId, updateData);

			if (editStatus) {
				return res.status(200).json({
					status: "redirect",
					url: `/admin/game-themes/${themeId}`,
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

			const deleteStatus = await gameThemeModel.findByIdAndUpdate(themeId, {
				isDeleted: false,
			});

			if (deleteStatus) {
				return res.status(200).json({
					status: "redirect",
					url: "/admin/game-themes/all",
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

			const deleteStatus = await gameThemeModel.findByIdAndUpdate(themeId, {
				isDeleted: true,
			});

			if (deleteStatus) {
				return res.status(200).json({
					status: "redirect",
					url: "/admin/game-themes/all",
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

			const deleteStatus = await gameThemeModel.findByIdAndDelete(themeId);

			if (deleteStatus) {
				return res.status(200).json({
					status: "redirect",
					url: "/admin/game-themes/all",
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

module.exports = new ApiGameThemeController();
