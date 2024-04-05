const historyGameModel = require("../../models/HistoryGameModel");
const gameTheme = require("../../models/GameThemeModel");
const cardTheme = require("../../models/CardThemeModel");
const userModel = require("../../models/UserModel");

class ApiGameResultController {
    constructor() {
        this.handleResult = this.handleResult.bind(this);
    }

    async createGameResult(gameData) {
        const newGameHistory = new historyGameModel(gameData);
        return newGameHistory.save();
    }

    async countUpGameTheme(themeId) {
        return gameTheme.findByIdAndUpdate(themeId, { $inc: { played: 1 } });
    }

    async countUpCardTheme(themeId) {
        return cardTheme.findByIdAndUpdate(themeId, { $inc: { used: 1 } });
    }

    async countUpPlayerCoins(userId, totalCoins) {
        return userModel.findByIdAndUpdate(userId, { $inc: { coins: totalCoins } });
    }

    async getUserHistory(userId) {
        return historyGameModel.find({ userId: userId });
    }

    getHighestScore(userHistory) {
        return userHistory.sort((a, b) => b.gameScore - a.gameScore)[0].gameScore;
    }

    getAverageScore(userHistory) {
        return userHistory.reduce((prev, current) => prev + current.gameScore, 0) / userHistory.length;
    }

    getMostPlayingSize(userHistory) {
        const countSize4x4 = userHistory.filter((row) => row.gameSize === "4x4").length;
        const countSize4x5 = userHistory.filter((row) => row.gameSize === "4x5").length
        return countSize4x4 >= countSize4x5 ? "4x4" : "4x5";
    }

    getMostPlayingTime(userHistory) {
        const time60 = userHistory.filter((row) => row.gameTime === 60 || row.gameTime === 5).length
        const time120 = userHistory.filter((row) => row.gameTime === 120).length
        const time300 = userHistory.filter((row) => row.gameTime === 300).length

        if (time60 > time120 && time60 > time300) {
            return 60
        } else if (time120 > time300) {
            return 120
        } else {
            return 300
        }
    }

    getTotalGamesPlayed(userHistory) {
        return userHistory.length
    }

    async updateUserAnalysis(userId) {
        const userHistory = await this.getUserHistory(userId)

        // calculate highest score & average score
        const highestScore = this.getHighestScore(userHistory)
        const averageScore = this.getAverageScore(userHistory)

        const mostPlayedSize = this.getMostPlayingSize(userHistory)
        const mostPlayedTime = this.getMostPlayingTime(userHistory)

        const gamePlayed = this.getTotalGamesPlayed(userHistory);

        return userModel.findByIdAndUpdate(userId, {
            highestScore,
            averageScore,
            mostPlayedSize,
            mostPlayedTime,
            gamePlayed
        });
    }

    async handleResult(req, res, next) {
        const { userId, gameThemeId, cardThemeId, totalCoins } = req.body;

        try {
            console.log(this);
            // save game history
            await this.createGameResult(req.body)
            let newUserData = {};
            if (!userId.includes("guestPlayer")) {
                // count up game theme and card themes
                await Promise.all([
                    this.countUpGameTheme(gameThemeId),
                    this.countUpCardTheme(cardThemeId),
                    this.countUpPlayerCoins(userId, totalCoins)
                ])

                await this.updateUserAnalysis(userId)

                newUserData = await userModel.findById(userId);
                console.log(newUserData);
            }

            return res.status(201).json({
                status: "success",
                message: "Save game results successfully",
                data: newUserData
            });
        } catch (err) {
            console.log(err)
            return res.status(503).json({
                status: "error",
                message: "There is a problem from the server",
                error: {
                    name: err.name,
                    message: err.message
                }
            })
        }
    }
}

module.exports = new ApiGameResultController();