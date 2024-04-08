import {defaultSelectTab} from "../admin.helpers.js";
import {direct} from "../../ts-utils/Direct.js";

export const handleTabAction = () => {
    const listTab: NodeListOf<HTMLElement> = document.querySelectorAll(".tab-button")
    defaultSelectTab(listTab)

    if (listTab) {
        listTab.forEach((tab) => {
            tab.addEventListener("click", () => {
                direct(`/admin/game-topics/${tab.getAttribute("data-tab")}`)
            })
        })
    }
}