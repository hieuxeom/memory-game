import { getSearchParams } from "../../../ts-utils/General.js";
import { fetchThemeById, setCurrentImageData, setIsVip, setIsVipListener, setPrice, setThemeName } from "../card-themes.helpers.js";
export const loadEditData = () => {
    const _id = getSearchParams("_id");
    if (_id) {
        fetchThemeById(_id).then((themeData) => {
            const { themeName, cardFront, cardBack, isVip, price } = themeData;
            setThemeName(themeName);
            setPrice(price);
            setIsVip(isVip);
            setIsVipListener();
            setCurrentImageData(cardFront, cardBack);
        });
    }
};
