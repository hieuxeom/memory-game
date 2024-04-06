import {FetchStatus, IApiResponse, ICardTheme, IGameTopic} from "../../types/Api.js";
import {PlayCard} from "../../classes/Card.js";

const getGameTopicData = async (gameTopicId: string) => {
    return await fetch(`/api/game-topics/${gameTopicId}`)
        .then(res => res.json())
        .then((res: IApiResponse) => {
            if (res.status === FetchStatus.SUCCESS) {
                return res.data;
            }
        })
}

const getCardThemeData = async (cardThemeId: string) => {
    return await fetch(`/api/card-themes/${cardThemeId}`)
        .then((res) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === FetchStatus.SUCCESS) {
                return res.data
            }
        })
}
const fetchData = async (gameTopicId: string, cardThemeId: string): Promise<[IGameTopic, ICardTheme]> => {
    return await Promise.all([getGameTopicData(gameTopicId), getCardThemeData(cardThemeId)]);
}

export const mapData = async (gameTopicId: string, cardThemeId: string, isNormal: boolean) => {
    const [gameTopicData, cardThemeData] = await fetchData(gameTopicId, cardThemeId);
    const {themeData} = gameTopicData;
    const {cardFront, cardBack} = cardThemeData;
    return themeData.map(({icon, value}) => new PlayCard({
        frontFace: cardFront,
        backFace: cardBack,
        icon,
        value
    }, isNormal).render());
}
