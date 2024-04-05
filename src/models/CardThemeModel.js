const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CardThemeSchema = new Schema(
	{
		themeName: String,
		cardFront: String,
		cardBack: String,
		isVip: Boolean,
		price: Number,
		used: { type: Number, default: 0 },
		isDeleted: Boolean,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("cardTheme", CardThemeSchema);
