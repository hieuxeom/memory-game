import { defaultSelectTime, selectTime } from "./game.config-time.js";
import { defaultSelectSize, selectSize } from "./game.config-size.js";
import { handleDirectButton } from "./game.direct.js";
import { getCurrentGameMode } from "../../ts-utils/General.js";
import { setWinScore } from "./game.show-win-score.js";
handleDirectButton();
defaultSelectSize();
defaultSelectTime();
selectTime();
selectSize();
if (getCurrentGameMode() === "challenge") {
    setWinScore();
}
