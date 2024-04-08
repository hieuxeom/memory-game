import { Button, Tag } from "../../admin.helpers.js";
import { fetchGameTopics, mapDeleteButton, mapEditButton, mapRecoverButton, mapViewButton } from "../game-topics.helpers.js";
const generateTableRow = ({ _id, themeName, themeData, price, played, isVip, isDeleted }, isHaveViewButton) => {
    return `<tr>
                <td>${themeName}</td>
                <td>${themeData.length}</td>
                <td>${price}</td>
                <td>${played}</td>
                <td>
                    ${isVip ? Tag["vip"] : ""}
                    ${isDeleted ? Tag["delete"] : ""}
                </td>
                <td>
                    <div class="w-full">
                        ${isHaveViewButton ? Button["view"](_id) : ""}
                        ${Button["edit"](_id)}
                        ${isDeleted ? Button["recover"](_id) : ""}
                        ${!isDeleted ? Button["delete"](_id) : ""}
                    </div>
                </td>
            </tr>`;
};
const mapGameTopicData = (listGameTopics, isHaveViewButton) => {
    return listGameTopics.map((gameTopicData) => generateTableRow(gameTopicData, isHaveViewButton)).join("");
};
export const loadTable = async (isHaveViewButton = true) => {
    await fetchGameTopics()
        .then((gameTopicsData) => {
        const listThemeContainer = document.getElementById("listThemeContainer");
        if (listThemeContainer) {
            listThemeContainer.innerHTML = mapGameTopicData(gameTopicsData, isHaveViewButton);
        }
    })
        .then(() => {
        mapViewButton();
        mapEditButton();
        mapRecoverButton();
        mapDeleteButton();
    });
};
