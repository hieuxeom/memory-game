const userModel = require("../../models/UserModel");
const historyGameModel = require("../../models/HistoryGameModel")

class ApiUserController {
    async getAllUsers(req, res, next) {
        const listUsersData = await userModel.find({});
        return res.status(200).json({
            status: "success",
            message: `Successfully received ${listUsersData.length} card themes`,
            data: listUsersData
        });
    }

    async getUserById(req, res, next) {
        const { userId } = req.params;
        const userData = await userModel.findById(userId);

        if (userData) {
            return res.json({
                status: "success",
                message: `Successfully received user data with _id = ${userData._id}`,
                data: userData
            });
        } else {
            return res.status(204).json({
                status: "success",
                message: "This request has been processed but there is no user data to return",
            })
        }
    }


}

module.exports = new ApiUserController();
