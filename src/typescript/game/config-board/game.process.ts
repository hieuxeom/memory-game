import {defaultSelectTime, selectTime} from "./game.config-time.js";
import {defaultSelectSize, selectSize} from "./game.config-size.js";
import {handleDirectButton} from "./game.direct.js";

handleDirectButton();

defaultSelectSize();
defaultSelectTime();

selectTime();
selectSize();