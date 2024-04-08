const cardThemeModel = require("../../models/CardThemeModel");
const { Alphabets } = require("../../utils/alphabets");
const gameThemeModel = require("../../models/GameTopicModel");

class ApiCardThemeController {
	constructor() {
		this.getThemesByQuery = this.getThemesByQuery.bind(this);
	}

	async getThemesByQuery(req, res, next) {
		const { filter, page, _s } = req.query;

		if (_s) {
			return this.getThemesBySearch(req, res, next);
		} else if (filter) {
			return this.getThemesByFilter(req, res, next);
		} else if (page) {
			return this.getThemesByPagination(req, res, next);
		} else {
			return this.getAllThemes(req, res, next);
		}
	}

	async getThemesBySearch(req, res, next) {
		const { _s } = req.query;

		const cardData = await cardThemeModel.find({
			themeName: {
				$regex: new RegExp(_s, "i"),
			},
		});
		if (cardData.length > 0) {
			return res.status(200).json({
				status: "success",
				message: `Successfully received ${cardData.length} card themes`,
				data: cardData,
			});
		} else {
			return res.status(204).json({
				status: "success",
				message: "The request has been processed but there is no card themes to return",
			});
		}
	}

	async getAllThemes(req, res, next) {
		if (req.headers.referer.includes("/admin")) {
			const cardData = await cardThemeModel.find({});

			return res.status(200).json({
				status: "success",
				message: `Successfully received ${cardData.length} card themes`,
				data: cardData,
			});
		} else {
			const cardData = await cardThemeModel.find({
				isDeleted: false,
			});

			return res.status(200).json({
				status: "success",
				message: `Successfully received ${cardData.length} card themes`,
				data: cardData,
			});
		}
	}

	async getThemesByFilter(req, res, next) {
		const { filter } = req.query;
		let cardData;
		switch (filter) {
			case "alphabets":
				cardData = await cardThemeModel.find({});
				let results = [];
				for (let x of Alphabets) {
					let regexFilter = new RegExp(`^[${x}${x.toLowerCase()}]`);
					results.push({
						title: x,
						data: cardData.filter((card) => regexFilter.test(card.themeName)),
					});
				}
				return res.status(200).json({
					status: "success",
					message: `Successfully received ${cardData.length} card themes sorted by A - Z`,
					data: results,
				});
			case "deleted":
				return res.status(200).json({
					status: "success",
					message: `Successfully received list deleted card themes`,
					data: await cardThemeModel.find({
						isDeleted: true,
					}),
				});
		}
	}

	async getThemesByPagination(req, res, next) {
		let { page, limit } = req.query;

		limit = limit || 10;

		const gameThemesData = await cardThemeModel
			.find()
			.limit(limit)
			.skip((page - 1) * limit);

		return res.status(200).json({
			status: "success",
			message: `Successfully received ${gameThemesData.length} game themes on page ${page}`,
			data: gameThemesData,
			currentPage: page,
			limit,
			// totalPage:
		});
	}

	async getThemeById(req, res, next) {
		const { themeId } = req.params;

		const cardThemeData = await cardThemeModel.findById(themeId);
		return res.status(200).json({
			status: "success",
			message: `Successfully received data of _id = ${cardThemeData._id}`,
			data: cardThemeData,
		});
	}

	async getThemesVip(req, res, next) {
		const { sort } = req.query;

		let cardThemeData;
		if (req.headers.referer.includes("/admin")) {
			if (sort) {
				cardThemeData = await cardThemeModel
					.find({
						isVip: true,
					})
					.sort({
						price: sort,
					});
			} else {
				cardThemeData = await cardThemeModel.find({
					isVip: true,
				});
			}
		} else {
			if (sort) {
				cardThemeData = await cardThemeModel
					.find({
						isVip: true,
						isDeleted: false,
					})
					.sort({
						price: sort,
					});
			} else {
				cardThemeData = await cardThemeModel.find({
					isVip: true,
					isDeleted: false,
				});
			}
		}

		return res.status(200).json({
			status: "success",
			message: `Successfully received ${cardThemeData.length} card(s) themes VIP`,
			data: cardThemeData,
		});
	}

	async createNewCardTheme(req, res, next) {
		const { themeName, isVip, price } = req.body;
		let { cardFront, cardBack } = req.files;

		if (!themeName) {
			return res.status(404).json({
				status: "error",
				message: "Missing Theme Name",
			});
		}

		if (cardFront) {
			cardFront = cardFront[0];
		} else {
			return res.status(404).json({
				status: "error",
				message: "Missing Theme Front field",
			});
		}

		if (cardBack) {
			cardBack = cardBack[0];
		} else {
			return res.status(404).json({
				status: "error",
				message: "Missing Theme Back field",
			});
		}

		const newCardTheme = new cardThemeModel({
			themeName,
			cardFront: cardFront.filename,
			cardBack: cardBack.filename,
			isVip: isVip === "true",
			price: price,
		});

		const createNewCardTheme = await newCardTheme.save();

		if (createNewCardTheme) {
			return res.status(201).json({
				status: "success",
				message: "New card theme created successfully",
			});
		} else {
			return res.status(503).json({
				status: "error",
				message: "There is a problem from the server",
			});
		}
	}

	async editCardTheme(req, res, next) {
		try {
			const { themeId, themeName, isVip, price } = req.body;

			let { cardFront, cardBack } = req.files;

			if (!themeId) {
				return res.status(404).json({
					status: "error",
					message: "Missing themeId",
				});
			}

			let updateData = {
				themeName,
				isVip: isVip === "true",
				price,
			};

			if (cardFront) {
				updateData = {
					...updateData,
					cardFront: cardFront[0].filename,
				};
			}
			if (cardBack) {
				updateData = {
					...updateData,
					cardBack: cardBack[0].filename,
				};
			}

			const updateCardTheme = await cardThemeModel.findByIdAndUpdate(themeId, updateData);

			if (updateCardTheme) {
				return res.status(303).json({
					status: "redirect",
					message: "Successfully updated",
					url: "/admin/card-themes",
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
			console.log(themeId);
			const recoverCardTheme = await cardThemeModel.findByIdAndUpdate(themeId, {
				isDeleted: false,
			});

			if (recoverCardTheme) {
				return res.status(200).json({
					status: "redirect",
					message: "Card theme deleted successfully",
					url: "/admin/card-themes",
				});
			} else {
				return res.status(400).json({
					message: "Bad request",
					description: "Have some problems",
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

	async softDeleted(req, res, next) {
		try {
			const { themeId } = req.params;
			console.log(themeId);

			const deleteCardTheme = await cardThemeModel.findByIdAndUpdate(themeId, {
				isDeleted: true,
			});

			if (deleteCardTheme) {
				return res.status(200).json({
					status: "redirect",
					message: "Card theme deleted successfully",
					url: "/admin/card-themes",
				});
			} else {
				return res.status(400).json({
					message: "Bad request",
					description: "Have some problems",
				});
			}
		} catch (err) {
			return res.status(500).json({
				message: "Bad request",
				description: err.message,
			});
		}
	}

	async forceDeleted(req, res, next) {
		try {
			const { themeId } = req.params;

			const deleteCardTheme = await cardThemeModel.findByIdAndDelete(themeId);

			if (deleteCardTheme) {
				return res.status(200).json({
					status: "redirect",
					message: "Card theme deleted successfully",
					url: "/admin/card-themes",
				});
			} else {
				return res.status(400).json({
					message: "Bad request",
					description: "Have some problems",
				});
			}
		} catch (err) {
			return res.status(500).json({
				message: "Bad request",
				description: err.message,
			});
		}
	}
}

module.exports = new ApiCardThemeController();
