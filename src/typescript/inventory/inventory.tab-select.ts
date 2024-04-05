import {getSearchParams} from "../ts-utils/General.js";

const getListTab = (): NodeListOf<HTMLButtonElement> => {
    return document.querySelectorAll(".tab-button");
}


export const selectTab = () => {
    const tab = getSearchParams("tab") ?? "card-themes";
    const listTab = getListTab();

    listTab.forEach((button) => {
        if (button.getAttribute("data-tab") === tab) {
            button.classList.add("active")
            button.classList.remove("inactive")
        } else {
            button.classList.add("inactive")
            button.classList.remove("active")
        }
        button.addEventListener("click", () => {
            window.location.href = `/inventory?tab=${button.getAttribute("data-tab")}`;
        })
    })
}