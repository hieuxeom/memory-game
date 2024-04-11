import { FetchStatus } from "../types/Api.js";
import { ShopGameTopic } from "../classes/Card.js";
import { getCurrentCardTheme, getListVipGames, getUserData, getUserId, isOwned } from "../ts-utils/General.js";
import { handleBuyAction } from "./shop.handle-buy.js";
const fetchListVipGameTopics = async (sortStyle) => {
    let fetchUrl = "/api/game-topics/vip";
    switch (sortStyle) {
        case "asc":
            fetchUrl = "/api/game-topics/vip?sort=asc";
            break;
        case "desc":
            fetchUrl = "/api/game-topics/vip?sort=desc";
            break;
        default:
            break;
    }
    return await fetch(fetchUrl)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
const fetchThemeById = async (_id) => {
    return await fetch(`/api/game-topics/${_id}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
const mapListCard = (listGameTopics) => {
    return listGameTopics.map(({ _id, themeThumbnail }) => new ShopGameTopic(_id, themeThumbnail).render()).join("");
};
const mapClickAction = (listCardElement) => {
    return listCardElement.forEach((card) => {
        card.addEventListener("click", async () => {
            await showDetails(card.getAttribute("data-id"));
        });
    });
};
const showDetails = async (_id) => {
    const vipDetailsContainer = document.getElementById("vipDetails");
    const gameTopicData = await fetchThemeById(_id);
    const { price } = gameTopicData;
    const userInventory = getListVipGames();
    if (vipDetailsContainer) {
        vipDetailsContainer.style.visibility = "visible";
        const buttonBuy = document.getElementById("buyButton");
        if (!getUserData()) {
            buttonBuy.classList.add("hidden");
        }
        else if (isOwned(_id, userInventory)) {
            buttonBuy.classList.remove("hidden");
            buttonBuy.style.pointerEvents = "none";
            buttonBuy.disabled = true;
            buttonBuy.innerHTML = "Owned";
        }
        else {
            buttonBuy.classList.remove("hidden");
            buttonBuy.style.pointerEvents = "auto";
            buttonBuy.disabled = false;
            buttonBuy.innerHTML = "Buy";
        }
        const themeDataContainer = document.getElementById("themeDataContainer");
        const priceValue = document.querySelector("#vipDetails .price");
        priceValue.innerHTML = `${price}`;
        const getCardTheme = fetch(`/api/card-themes/${getCurrentCardTheme()}`)
            .then((res) => res.json())
            .then((res) => {
            if (res.status === FetchStatus.SUCCESS) {
                return res.data;
            }
        });
        const getGameTheme = fetch(`/api/game-topics/${_id}`)
            .then((res) => res.json())
            .then((res) => {
            if (res.status === FetchStatus.SUCCESS) {
                return res.data;
            }
        });
        Promise.all([getCardTheme, getGameTheme]).then(([cardData, gameData]) => {
            const { cardFront } = cardData;
            const { themeData } = gameData;
            themeDataContainer.innerHTML = themeData
                .map(({ icon, value }) => {
                return `<div class="card open relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden">
                                <div class="bg-transparent card-front w-full h-full">
                                    <div class="bg-transparent">
                                        <img src="/images/themepacks/${cardFront}" class="w-full h-full" alt=""/>
                                    </div>
                                    <div class="bg-transparent absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                                        <i class="${icon} text-4xl"></i>
                                    </div>
                                </div>
                            </div>`;
            })
                .join("");
        });
        const userId = getUserId();
        if (userId) {
            const postData = {
                userId,
                themeId: _id,
                typeTheme: "game",
            };
            handleBuyAction(postData);
        }
    }
};
export const showVipGameTopics = () => {
    const listCardContainer = document.getElementById("listCard");
    if (listCardContainer) {
        fetchListVipGameTopics()
            .then((listGameTopics) => {
            listCardContainer.innerHTML = mapListCard(listGameTopics);
        })
            .then(() => {
            const listCardElement = document.querySelectorAll(".card-theme");
            mapClickAction(listCardElement);
        });
    }
};
