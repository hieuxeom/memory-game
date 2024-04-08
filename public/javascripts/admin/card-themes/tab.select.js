import { direct } from "../../ts-utils/Direct.js";
import { defaultSelectTab } from "../admin.helpers.js";
export const handleTabAction = () => {
    const listTab = document.querySelectorAll(".tab-button");
    defaultSelectTab(listTab);
    if (listTab) {
        listTab.forEach((tab) => {
            tab.addEventListener("click", () => {
                direct(`/admin/card-themes/${tab.getAttribute("data-tab")}`);
            });
        });
    }
};
