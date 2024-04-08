import { getSearchParams } from "../../../ts-utils/General.js";
import { fetchGameTopicsById } from "../game-topics.helpers.js";
import { setIsVip, setIsVipListener, setPrice, setRawData, setThemeName } from "../game-topics.helpers.js";
export const loadGameTopicData = () => {
    const _id = getSearchParams("_id");
    if (_id) {
        fetchGameTopicsById(_id).then((gameTopicData) => {
            const { themeName, rawData, isVip, price, type } = gameTopicData;
            setThemeName(themeName);
            setIsVip(isVip);
            setIsVipListener();
            setPrice(price);
            setRawData(rawData);
        });
    }
};
