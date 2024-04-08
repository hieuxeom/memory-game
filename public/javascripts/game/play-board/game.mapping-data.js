import { FetchStatus } from "../../types/Api.js";
import { PlayCard } from "../../classes/Card.js";
const getGameTopicData = async (gameTopicId) => {
    return await fetch(`/api/game-topics/${gameTopicId}`)
        .then(res => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
const getCardThemeData = async (cardThemeId) => {
    return await fetch(`/api/card-themes/${cardThemeId}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
const fetchData = async (gameTopicId, cardThemeId) => {
    return await Promise.all([getGameTopicData(gameTopicId), getCardThemeData(cardThemeId)]);
};
export const mapData = async (gameTopicId, cardThemeId, isNormal) => {
    const [gameTopicData, cardThemeData] = await fetchData(gameTopicId, cardThemeId);
    const { themeData } = gameTopicData;
    const { cardFront, cardBack } = cardThemeData;
    return themeData.map(({ icon, value }) => new PlayCard({
        frontFace: cardFront,
        backFace: cardBack,
        icon,
        value
    }, isNormal).render());
};
