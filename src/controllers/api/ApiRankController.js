const historyGameModel = require("../../models/HistoryGameModel")
const userModel = require("../../models/UserModel")

class ApiRankController {
    async get(req, res, next) {
        let { filter } = req.query;

        if (filter === "overall") {
            filter = null
        }

        let listIdTop = await historyGameModel.find(filter ? {
            gameSize: filter
        } : {}).sort({
            gameScore: -1
        }).distinct("userId");

        let listTop = await Promise.all(listIdTop.map(async (id) => {
            let user = {};
            const findOptions = filter ? {
                userId: id,
                gameSize: filter,
            } : {
                userId: id,
            }

            const gameData = await historyGameModel.findOne(findOptions).sort({ gameScore: -1 });
            user.gameScore = gameData.gameScore;
            if (!gameData.userId.includes("guestPlayer")) {
                const userData = await userModel.findById(gameData.userId);
                user.displayName = userData.displayName;

            } else {
                user.displayName = id;
            }
            return user;
        }));

        const responseData = listTop.sort((a, b) => b.gameScore - a.gameScore);
        return res.status(200).json({
            status: "success",
            message: "Successfully received current ranking data",
            data: responseData
        });
    }

    // async getWithFilter(req, res, next) {
    //     const { filter } = req.query;
    //
    //     let listIdTop = await historyGameModel.find({
    //         gameSize: filter
    //     }).sort({
    //         gameScore: -1
    //     }).distinct("userId");
    //
    //     let listTop = await Promise.all(listIdTop.map(async (id) => {
    //         let user = {};
    //         const gameData = await historyGameModel.findOne({
    //             userId: id
    //         }).sort({ gameScore: -1 });
    //         user.gameScore = gameData.gameScore;
    //         if (!gameData.userId.includes("guestPlayer")) {
    //             const userData = await userModel.findById(gameData.userId);
    //             user.displayName = userData.displayName;
    //         } else {
    //             user.displayName = id;
    //         }
    //         return user;
    //     }));
    //
    //     res.status(200).json(listTop);
    // }
}

module.exports = new ApiRankController();