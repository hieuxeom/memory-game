import { ICardTheme } from "../../../types/Api.js";

import { getSearchParams } from "../../../ts-utils/General.js";
import { Button, Tag } from "../../admin.helpers.js";
import { fetchListCardThemes, mapDeleteButton, mapEditButton, mapRecoverButton } from "../card-themes.helpers.js";

const generateTableRow = ({ _id, themeName, isVip, isDeleted }: ICardTheme): string => {
	return `<tr>
                <td>${themeName}</td>
                <td>${isVip ? Tag["vip"] : ""} ${isDeleted ? Tag["delete"] : ""}</td>
                <td>
                    <div class="w-full">
                        ${Button["edit"](_id)}
                        ${isDeleted ? Button["recover"](_id) : ""}
                        ${!isDeleted ? Button["delete"](_id) : ""}
                    </div>
                </td>
            </tr>`;
};

const mapThemeData = (themeData: ICardTheme[]): string => {
	return themeData.map((theme) => generateTableRow(theme)).join("");
};

export const loadEditTable = async () => {
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
			});
	}
};
