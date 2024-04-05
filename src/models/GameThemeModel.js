const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const subThemeData = new Schema({
    icon: { type: String, required: true },
    value: { type: String, required: true },
});

const GameSchemaSchema = new Schema(
    {
        themeName: { type: String, required: true },
        themeData: { type: [subThemeData], required: true },
        rawData: String,
        themeThumbnail: String,
        type: { type: String, required: true },
        played: { type: Number, default: 0 },
        isVip: Boolean,
        price: Number,
        isDeleted: Boolean,
    },
    { timestamps: true }
);

module.exports = mongoose.model("gameTheme", GameSchemaSchema);
