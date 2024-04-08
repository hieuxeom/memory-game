import { FetchStatus, IApiResponse, ICardTheme } from "../../../types/Api.js";
import { convertTime, getSearchParams } from "../../../ts-utils/General.js";
import { fetchListDeletedCardThemes, mapPermanentlyDeleteButton, mapRecoverButton, mapViewButton } from "../card-themes.helpers.js";
import { Button, Tag } from "../../admin.helpers.js";

const generateTableRow = ({ _id, themeName, price, used, createdAt, updatedAt, isVip, isDeleted }: ICardTheme): string => {
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
                        ${isDeleted ? Button["recover"](_id) : ""}
                        ${Button["delete"](_id)}
                    </div>
                </td>
            </tr>`;
};

const mapThemeData = (themeData: ICardTheme[]): string => {
	return themeData.map((theme) => generateTableRow(theme)).join("");
};

export const loadTable = async () => {
	const filter = getSearchParams("filter") ?? "default";
	const listThemeContainer = document.getElementById("listThemeContainer");

	if (listThemeContainer) {
		await fetchListDeletedCardThemes()
			.then((themeData) => {
				if (themeData.length > 0) {
					listThemeContainer.innerHTML = mapThemeData(themeData);
				} else {
					listThemeContainer.innerHTML = `<tr>
						<td colspan="7" class="text-danger italic">There are no cards in the soft deleted state</td>
					</tr>`;
				}
			})
			.then(() => {
				mapPermanentlyDeleteButton();
				mapRecoverButton();
				mapViewButton();
			});
	}
};
