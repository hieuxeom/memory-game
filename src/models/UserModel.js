const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserVipItems = new Schema({
	cardThemes: { type: [], default: [] },
	gameTopics: { type: [], default: [] },
});

const UserSchema = new Schema(
	{
		displayName: String,
		email: String,
		photoURL: String,
		provider: String,
		password: String,
		role: { type: String, default: "user" },
		highestScore: { type: Number, default: 0 },
		averageScore: { type: Number, default: 0 },
		mostPlayedSize: { type: String },
		mostPlayedTime: { type: Number },
		gamePlayed: { type: Number, default: 0 },
		coins: { type: Number, default: 0 },
		userVipItems: {
			type: UserVipItems,
			default: {
				cardThemes: [],
				gameTopics: [],
			},
		},
		lastLogin: { type: Date, default: Date },
		streakLogin: { type: Number, default: 1 },
		maxStreak: { type: Number, default: 1 },
		isGetReward: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
