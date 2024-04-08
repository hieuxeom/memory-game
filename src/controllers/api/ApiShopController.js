const userModel = require("../../models/UserModel");
const cardThemeModel = require("../../models/CardThemeModel");
const gameThemeModel = require("../../models/GameTopicModel");

class ApiShopController {
	constructor() {
		this.buy = this.buy.bind(this);
	}

	async getUserCoins(userId) {
		console.log(userId);
		console.log(await userModel.findById(userId));
		return userModel.findById(userId).select("coins");
	}

	async getThemePrice(themeId, typeTheme) {
		switch (typeTheme) {
			case "card":
				return cardThemeModel.findById(themeId).select("price");
			case "game":
				return gameThemeModel.findById(themeId).select("price");
		}
	}

	async addThemeToUserInventory(userId, themeId, typeTheme) {
		switch (typeTheme) {
			case "card":
				return userModel.findByIdAndUpdate(userId, {
					$push: { "userVipItems.cardThemes": themeId },
				});
			case "game":
				return userModel.findByIdAndUpdate(userId, {
					$push: { "userVipItems.gameTopics": themeId },
				});
		}
	}

	async checkOutUserCoins(userId, coins) {
		return userModel.findByIdAndUpdate(userId, {
			$inc: { coins: -coins },
		});
	}

	async buy(req, res, next) {
		// console.log(req.body)
		const { userId, themeId, typeTheme } = req.body;
		console.log(userId, themeId, typeTheme);

		const { coins: userCoins } = await this.getUserCoins(userId);
		const { price: themePrice } = await this.getThemePrice(themeId, typeTheme);

		if (userCoins > themePrice) {
			await this.addThemeToUserInventory(userId, themeId, typeTheme);
			await this.checkOutUserCoins(userId, themePrice);

			const newUserData = await userModel.findById(userId);

			return res.status(200).json({
				status: "success",
				message: "Buy theme sucessfully",
				data: newUserData,
			});
		} else {
			return res.status(404).json({
				status: "fail",
				message: "Not enough coins to buy this themes",
			});
		}
	}
}

module.exports = new ApiShopController();
