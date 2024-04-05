import {FetchStatus, IApiResponse, ICardTheme} from "../types/Api.js";
import {ShopCardTheme} from "../classes/Card.js";
import {getListVipCards, getUserId, isOwned} from "../ts-utils/General.js";
import {handleBuyAction} from "./shop.handle-buy.js";

const fetchListVipCardThemes = async (sortStyle?: string) => {
    let fetchUrl = "/api/card-themes/vip"
    switch (sortStyle) {
        case "asc":
            fetchUrl = "/api/card-themes/vip?sort=asc"
            break;
        case "desc":
            fetchUrl = "/api/card-themes/vip?sort=desc"
            break;
        default:
            break
    }

    return await fetch(fetchUrl)
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === FetchStatus.SUCCESS) {
                return res.data
            }
        });
}

const fetchThemeById = async (_id: string): Promise<ICardTheme> => {
    return await fetch(`/api/card-themes/${_id}`)
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === FetchStatus.SUCCESS) {
                return res.data
            }
        })
}

const mapListCard = (listCardTheme: ICardTheme[]) => {
    return listCardTheme.map(({_id, cardBack}) => new ShopCardTheme(_id, cardBack).render()).join("");
}

const mapClickAction = (listCardElement: NodeListOf<HTMLElement>) => {
    return listCardElement.forEach((card) => {
        card.addEventListener("click", async () => {
            await showDetails(card.getAttribute("data-id")!)
        })
    })
}



const showDetails = async (_id: string) => {
    const themeData = await fetchThemeById(_id);
    const {cardBack, cardFront, price} = themeData
    const userInventory = getListVipCards();

    const vipDetailsContainer = document.getElementById("vipDetails");
    if (vipDetailsContainer) {
        vipDetailsContainer.style.visibility = "visible";
        const backFace = document.querySelector("#vipDetails .back-face") as HTMLImageElement;
        const frontFace = document.querySelector("#vipDetails .front-face") as HTMLImageElement
        const priceValue = document.querySelector("#vipDetails .price") as HTMLElement;
        const buttonBuy: HTMLButtonElement = document.getElementById("buyButton") as HTMLButtonElement;

        if (isOwned(_id, userInventory)) {
            buttonBuy.style.pointerEvents = "none";
            buttonBuy.disabled = true;
            buttonBuy.innerHTML = "Owned"
        } else {
            buttonBuy.style.pointerEvents = "auto";
            buttonBuy.disabled = false;
            buttonBuy.innerHTML = "Buy"
        }

        backFace.src = `/images/themepacks/${cardBack}`
        frontFace.src = `/images/themepacks/${cardFront}`
        priceValue.innerHTML = `${price}`;

        const userId = getUserId();

        if (userId) {
            const postData = {
                userId,
                themeId: _id,
                typeTheme: "card",
            }

            handleBuyAction(postData)
        }
    }

}

export const showVipCardThemes = () => {
    const listCardContainer = document.getElementById("listCard");
    if (listCardContainer) {
        fetchListVipCardThemes()
            .then((listCardTheme) => {
                listCardContainer.innerHTML = mapListCard(listCardTheme)
            })
            .then(() => {
                const listCardElement: NodeListOf<HTMLElement> = document.querySelectorAll(".card-theme");
                mapClickAction(listCardElement)
            })
    }
}