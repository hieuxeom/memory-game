import { Button, Tag } from "../../admin.helpers.js";
import { fetchGameTopicsDeleted, mapPermanentlyDeleteButton, mapRecoverButton, mapViewButton, } from "../game-topics.helpers.js";
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
                        ${Button["view"](_id)}
                        ${Button["recover"](_id)}
                        ${Button["delete"](_id)}
                    </div>
                </td>
            </tr>`;
};
const mapGameTopicData = (listGameTopics, isHaveViewButton) => {
    return listGameTopics.map((gameTopicData) => generateTableRow(gameTopicData, isHaveViewButton)).join("");
};
export const loadTable = async (isHaveViewButton = true) => {
    await fetchGameTopicsDeleted()
        .then((gameTopicsData) => {
        const listThemeContainer = document.getElementById("listThemeContainer");
        if (listThemeContainer) {
            if (gameTopicsData.length > 0) {
                listThemeContainer.innerHTML = mapGameTopicData(gameTopicsData, isHaveViewButton);
            }
            else {
                listThemeContainer.innerHTML = `<tr>
                    <td colspan="6" class="text-danger italic">There are no topics in the soft deleted state</td>
                </tr>`;
            }
        }
    })
        .then(() => {
        mapViewButton();
        mapRecoverButton();
        mapPermanentlyDeleteButton();
    });
};
