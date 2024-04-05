import {FetchStatus, IApiResponse, ICardTheme, IGameTopic} from "../types/Api.js";
import {CardThemeCard, GameTopicCard} from "../classes/Card.js";
import {getCurrentCardTheme, getCurrentGameTopic, setCardTheme, setGameTopic} from "../ts-utils/General.js";

const fetchListGameTopic = async (searchString: string | null): Promise<IGameTopic[]> => {
    return await fetch(`/api/game-topics?${searchString ? `_s=${searchString}` : ""}`)
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === FetchStatus.SUCCESS) {
                return res.data
            }
        })
}

const mapListGameTopic = (listGameTopics: IGameTopic[]) => {
    return listGameTopics.map(({
                                   _id,
                                   themeName,
                                   themeThumbnail
                               }) => new GameTopicCard(_id, themeName, themeThumbnail, _id === getCurrentGameTopic()).render()).join("");
}

const mapClickAction = (listCard: NodeListOf<HTMLElement>) => {
    const handleSelect = (card: HTMLElement) => {
        card.classList.add("selected");
        setGameTopic(card.getAttribute("data-id")!)
    }

    const handleUnSelect = () => {
        listCard.forEach((card: HTMLElement) => {
            if (card.classList.contains("selected")) {
                card.classList.remove("selected")
                return;
            }
        })
    }

    return listCard.forEach((card) => {
        card.addEventListener("click", () => {
            handleUnSelect();
            handleSelect(card);
        })
    })
}

const handleShowCardTheme = (searchString: string | null = null) => {
    const listCardContainer = document.getElementById("listCardContainer");

    if (listCardContainer) {
        fetchListGameTopic(searchString)
            .then((listGameTopic) => {
                console.log(listGameTopic)
                listCardContainer.innerHTML = mapListGameTopic(listGameTopic);
            })
            .then(() => {
                const listCard: NodeListOf<HTMLElement> = document.querySelectorAll(".game-topic");
                mapClickAction(listCard);
            });
    } else {
        console.log("Container not found")
    }

}

export const handleGameTopicTab = () => {
    handleShowCardTheme()

    const searchBox: HTMLInputElement = document.getElementById("searchBox") as HTMLInputElement;

    if (searchBox) {
        searchBox.addEventListener("input", () => {
            handleShowCardTheme(searchBox.value)
        })
    }
}