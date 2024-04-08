import { convertTime, getSearchParams } from "../../../ts-utils/General.js";
import { fetchListCardThemes, mapDeleteButton, mapEditButton, mapRecoverButton, mapViewButton } from "../card-themes.helpers.js";
import { Button, Tag } from "../../admin.helpers.js";
const generateTableRow = ({ _id, themeName, price, used, createdAt, updatedAt, isVip, isDeleted }) => {
    return `<tr>
                <td>${themeName}</td>
                <td>${price}</td>
                <td>${used}</td>
                <td>${convertTime(createdAt)}</td>
                <td>${convertTime(updatedAt)}</td>
                <td>${isVip ? Tag["vip"] : ""} ${isDeleted ? Tag["delete"] : ""}</td>
                <td>
                    <div class="w-full">
                        ${Button["view"](_id)}
                        ${Button["edit"](_id)}
                        ${isDeleted ? Button["recover"](_id) : ""}
                        ${!isDeleted ? Button["delete"](_id) : ""}
                    </div>
                </td>
            </tr>`;
};
const mapThemeData = (themeData) => {
    return themeData.map((theme) => generateTableRow(theme)).join("");
};
export const loadTable = async () => {
    const filter = getSearchParams("filter") ?? "default";
    const listThemeContainer = document.getElementById("listThemeContainer");
    if (listThemeContainer) {
        await fetchListCardThemes(filter)
            .then((themeData) => {
            listThemeContainer.innerHTML = mapThemeData(themeData);
        })
            .then(() => {
            mapDeleteButton();
            mapEditButton();
            mapRecoverButton();
            mapViewButton();
        });
    }
};
