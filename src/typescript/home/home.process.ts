import { getUserData } from "../ts-utils/General.js";
import { handeDirectButton } from "./home.direct.js";
import { isExpiredSession } from "./home.is-expired-session.js";
import { handleSelectMode } from "./home.selectMode.js";
import { handleSetStreak } from "./home.set-streak.js";
import { handleStreakReward } from "./home.streak-reward.js";

isExpiredSession();

handeDirectButton();
handleSelectMode();

handleSetStreak();
if (getUserData()) {
	handleStreakReward();
}
