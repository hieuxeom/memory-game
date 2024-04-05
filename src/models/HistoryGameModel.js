const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const HistoryGameSchema = new Schema(
    {
        userId: { type: String, required: true },
        gameThemeId: { type: String, required: true },
        cardThemeId: { type: String, required: true },
        gameMode: { type: String, required: true },
        isWin: Boolean,
        gameTime: { type: Number, required: true },
        gameSize: { type: String, required: true },
        gameScore: { type: Number, required: true },
        gameTurn: { type: Number, required: true },
        totalCoins: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("historyGame", HistoryGameSchema);
