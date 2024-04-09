import { getUserData } from "../ts-utils/General.js";
import { handeDirectButton } from "./home.direct.js";
import { handleSelectMode } from "./home.selectMode.js";
import { handleSetStreak } from "./home.set-streak.js";
import { handleStreakReward } from "./home.streak-reward.js";

handeDirectButton();
handleSelectMode();

if (getUserData()) {
	handleSetStreak();
	handleStreakReward();
}
