import { selectTab } from "./inventory.tab-select.js";
import { getSearchParams } from "../ts-utils/General.js";
import { handleCardThemeTab } from "./inventory.card-theme-tab.js";
import { handleGameTopicTab } from "./inventory.game-topic-tab.js";
selectTab();
const tab = getSearchParams("tab") ?? "card-themes";
switch (tab) {
    case "card-themes":
        handleCardThemeTab();
        break;
    case "game-topics":
        handleGameTopicTab();
        break;
}
