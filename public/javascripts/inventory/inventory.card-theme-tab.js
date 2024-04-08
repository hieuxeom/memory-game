import { FetchStatus } from "../types/Api.js";
import { CardThemeCard } from "../classes/Card.js";
import { getCurrentCardTheme, getListVipCards, setCardTheme } from "../ts-utils/General.js";
const fetchListCardTheme = async (searchString) => {
    return await fetch(`/api/card-themes?${searchString ? `_s=${searchString}` : ""}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
const mapListCardTheme = (listCardTheme) => {
    return listCardTheme
        .map(({ _id, cardBack, cardFront }) => new CardThemeCard(_id, cardBack, cardFront, _id === getCurrentCardTheme()).render())
        .join("");
};
const mapClickAction = (listCard) => {
    const handleSelect = (card) => {
        card.classList.add("selected");
        setCardTheme(card.getAttribute("data-id"));
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
const handleShowCardTheme = (searchString = null) => {
    const listCardContainer = document.getElementById("listCardContainer");
    if (listCardContainer) {
        fetchListCardTheme(searchString)
            .then((listCardThemes) => {
            const ownedCardThemes = getListVipCards();
            listCardThemes = listCardThemes.filter((cardTheme) => {
                if (!cardTheme.isVip) {
                    return cardTheme;
                }
                else {
                    if (ownedCardThemes.includes(cardTheme._id)) {
                        return cardTheme;
                    }
                }
            });
            listCardContainer.innerHTML = mapListCardTheme(listCardThemes);
        })
            .then(() => {
            const listCard = document.querySelectorAll(".card-theme");
            mapClickAction(listCard);
        });
    }
    else {
        console.log("Container not found");
    }
};
export const handleCardThemeTab = async () => {
    handleShowCardTheme();
    const searchBox = document.getElementById("searchBox");
    if (searchBox) {
        searchBox.addEventListener("input", () => {
            handleShowCardTheme(searchBox.value);
        });
    }
};
