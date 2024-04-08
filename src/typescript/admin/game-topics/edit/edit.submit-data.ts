import { reload } from "../../../ts-utils/Direct.js";
import { IApiResponse } from "../../../types/Api.js";
import { getPrice, getRawData, getThemeId, getThemeName, getTopicThumbnail, parseGameData } from "../game-topics.helpers.js";

const submitData = (event: MouseEvent) => {
	event.preventDefault();

	let themeDataType = null;
	const listThemeTypes: NodeListOf<HTMLInputElement> = document.getElementsByName("themeDataType")! as NodeListOf<HTMLInputElement>;

	listThemeTypes.forEach((e) => {
		if (e.checked) {
			themeDataType = e.value;
			return;
		}
	});

	const themeDataParsed = parseGameData(getRawData().split("\n"));

	const formData = new FormData();
	formData.append("themeId", getThemeId());
	formData.append("themeName", getThemeName());
	formData.append("themeThumbnail", getTopicThumbnail());
	formData.append("price", getPrice());
	formData.append("themeDataParsed", JSON.stringify(themeDataParsed));
	formData.append("rawData", getRawData());
	formData.append("themeDataType", themeDataType ?? "icon");

	fetch("/api/game-topics/", {
		method: "PUT",
		body: formData,
	})
		.then((res) => res.json())
		.then((res: IApiResponse) => {
			if (res.status === "redirect") {
				reload();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export const handleSubmitData = () => {
	const submitButton: HTMLButtonElement = document.getElementById("submitButton") as HTMLButtonElement;
	submitButton.addEventListener("click", submitData);
};
