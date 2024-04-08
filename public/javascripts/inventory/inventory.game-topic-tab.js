import { FetchStatus } from "../types/Api.js";
import { GameTopicCard } from "../classes/Card.js";
import { getCurrentGameTopic, getListVipGames, setGameTopic } from "../ts-utils/General.js";
const fetchListGameTopic = async (searchString) => {
    return await fetch(`/api/game-topics?${searchString ? `_s=${searchString}` : ""}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
const mapListGameTopic = (listGameTopics) => {
    return listGameTopics
        .map(({ _id, themeName, themeThumbnail }) => new GameTopicCard(_id, themeName, themeThumbnail, _id === getCurrentGameTopic()).render())
        .join("");
};
const mapClickAction = (listCard) => {
    const handleSelect = (card) => {
        card.classList.add("selected");
        setGameTopic(card.getAttribute("data-id"));
    };
    const handleUnSelect = () => {
        listCard.forEach((card) => {
            if (card.classList.contains("selected")) {
                card.classList.remove("selected");
                return;
            }
        });
    };
    return listCard.forEach((card) => {
        card.addEventListener("click", () => {
            handleUnSelect();
            handleSelect(card);
        });
    });
};
const handleShowOwnedGameTopics = (searchString = null) => {
    const listCardContainer = document.getElementById("listCardContainer");
    if (listCardContainer) {
        fetchListGameTopic(searchString)
            .then((listGameTopic) => {
            const ownedGameTopic = getListVipGames();
            listGameTopic = listGameTopic.filter((gameTopic) => {
                if (!gameTopic.isVip) {
                    return gameTopic;
                }
                else {
                    if (ownedGameTopic.includes(gameTopic._id)) {
                        return gameTopic;
                    }
                }
            });
            listCardContainer.innerHTML = mapListGameTopic(listGameTopic);
        })
            .then(() => {
            const listCard = document.querySelectorAll(".game-topic");
            mapClickAction(listCard);
        });
    }
    else {
        console.log("Container not found");
    }
};
export const handleGameTopicTab = () => {
    handleShowOwnedGameTopics();
    const searchBox = document.getElementById("searchBox");
    if (searchBox) {
        searchBox.addEventListener("input", () => {
            handleShowOwnedGameTopics(searchBox.value);
        });
    }
};
