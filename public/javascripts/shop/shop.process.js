import { handleTabDirection, setUserCoins } from "./shop.default.js";
import { getSearchParams } from "../ts-utils/General.js";
import { showVipCardThemes } from "./shop.card-themes.js";
import { showVipGameTopics } from "./shop.game-topics.js";
setUserCoins();
handleTabDirection();
const tab = getSearchParams("tab") || "card-themes";
if (tab === "card-themes") {
    showVipCardThemes();
}
else if (tab === "game-topics") {
    showVipGameTopics();
}
