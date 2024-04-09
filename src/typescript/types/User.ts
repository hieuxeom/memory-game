export type TypeUserVipItems = {
	cardThemes: string[];
	gameTopics: string[];
};

export type Provider = "google" | "credentials";

export interface IUser {
	_id: string;
	displayName: string;
	email: string;
	photoURL: string;
	provider: Provider;
	createdAt: string;
	updatedAt: string;
	gamePlayed: number;
	averageScore: number;
	highestScore: number;
	mostPlayedSize: string;
	mostPlayedTime: number;
	mostPlayedMode: string;
	role: string;
	userVipItems: TypeUserVipItems;
	coins: number;
	lastLogin: Date;
	streakLogin: number;
	maxStreak: number;
	isGetReward: boolean;
}
