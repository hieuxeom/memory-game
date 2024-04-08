import { getSearchParams, getUserData } from "../ts-utils/General.js";
const setCoins = (coins) => {
    const userCoinsElement = document.getElementById("userCoins");
    if (userCoinsElement) {
        userCoinsElement.innerHTML = coins;
    }
};
export const setUserCoins = () => {
    const userData = getUserData();
    if (userData) {
        const { coins } = userData;
        setCoins(`${coins}`);
    }
    else {
    }
};
const getListTab = () => {
    return document.querySelectorAll(".tab-button");
};
export const handleTabDirection = () => {
    const listTab = getListTab();
    const tab = getSearchParams("tab") || "card-themes";
    listTab.forEach((button) => {
        if (button.getAttribute("data-tab") === tab) {
            button.classList.add("active");
            button.classList.remove("inactive");
        }
        else {
            button.classList.add("inactive");
            button.classList.remove("active");
        }
        button.addEventListener("click", () => {
            window.location.href = `/shop?tab=${button.getAttribute("data-tab")}`;
        });
    });
};
