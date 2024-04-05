const historyGameModel = require("../../models/HistoryGameModel")

class ApiGameHistoryController {
    async get(req, res, next) {
        return res.status(200).json(await historyGameModel.find({}))
    }

    async getPlayerGameHistory(req, res, next) {
        const { userId } = req.params;
        const userHistoryData = await historyGameModel.find({ userId }).sort({ createdAt: -1 })
        return res.json({
            status: "success",
            message: "Successfully received user games history",
            data: userHistoryData
        })
    }
}

module.exports = new ApiGameHistoryController();