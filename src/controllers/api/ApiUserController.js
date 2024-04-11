const userModel = require("../../models/UserModel");
const historyGameModel = require("../../models/HistoryGameModel");
const { calculateStreak, isCurrentDate } = require("../../utils/streak.js");

class ApiUserController {
	constructor() {
		this.getStreak = this.getStreak.bind(this);
		this.getStreakReward = this.getStreakReward.bind(this);
	}

	async getAllUsers(req, res, next) {
		const listUsersData = await userModel.find({});
		return res.status(200).json({
			status: "success",
			message: `Successfully received ${listUsersData.length} card themes`,
			data: listUsersData,
		});
	}

	async getUserById(req, res, next) {
		const { userId } = req.params;
		const userData = await userModel.findById(userId);

		if (userData) {
			return res.json({
				status: "success",
				message: `Successfully received user data with _id = ${userData._id}`,
				data: userData,
			});
		} else {
			return res.status(204).json({
				status: "success",
				message: "This request has been processed but there is no user data to return",
			});
		}
	}

	async getStreak(req, res, next) {
		const { userId } = req.params;

		if (userId !== "undefined") {
			const userData = await userModel.findById(userId).select(["lastLogin", "streakLogin", "maxStreak"]);

			const { lastLogin, streakLogin, maxStreak } = userData;

			const currentDate = new Date();

			if (!isCurrentDate(lastLogin)) {
				const differenceDays = calculateStreak(new Date(lastLogin), new Date(currentDate));

				if (differenceDays < 2) {
					await userModel.findByIdAndUpdate(userId, {
						lastLogin: new Date(),
						$inc: { streakLogin: 1 },
						maxStreak: Math.max(streakLogin + 1, maxStreak),
						isGetReward: false,
					});
				} else {
					await userModel.findByIdAndUpdate(userId, {
						lastLogin: new Date(),
						streakLogin: 0,
						isGetReward: false,
					});
				}
			}

			return res.status(200).json({
				status: "success",
				message: "Get user streak information ",
				data: await userModel.findById(userId),
			});
		} else {
			return res.status(404).json({
				status: "fail",
			});
		}
	}

	getRewardCoins(streakLogin) {
		if (streakLogin === 1) return 0;

		if (streakLogin >= 2 && streakLogin <= 3) {
			return 100;
		}

		if (streakLogin >= 4 && streakLogin <= 5) {
			return 100;
		}

		if (streakLogin >= 6 && streakLogin <= 9) {
			return 300;
		}

		if (streakLogin >= 10) {
			return 500;
		}
	}

	async getStreakReward(req, res, next) {
		const { userId } = req.params;

		const { isGetReward, streakLogin } = await userModel.findById(userId);
		console.log("🚀 ~ ApiUserController ~ getStreakReward ~ isGetReward, streakLogin:", isGetReward, streakLogin);

		if (isGetReward) {
			return res.status(200).json({
				status: "success",
				message: "You have received your reward today",
				data: await userModel.findById(userId),
			});
		} else {
			await userModel.findByIdAndUpdate(userId, {
				$inc: { coins: this.getRewardCoins(streakLogin) },
				isGetReward: true,
			});

			return res.status(200).json({
				status: "success",
				message: `You earn ${this.getRewardCoins(
					streakLogin
				)} coins for maintaining a streak of logging in for ${streakLogin} consecutive days`,
				data: await userModel.findById(userId),
			});
		}
	}
}

module.exports = new ApiUserController();
