import { reload } from "../../../ts-utils/Direct.js";
import { FetchStatus, IApiResponse } from "../../../types/Api.js";
import {
	getIsVip,
	getPrice,
	getRawData,
	getThemeName,
	getTopicThumbnail,
	getTopicType,
	parseGameData,
	setIsVipListener,
} from "../game-topics.helpers.js";

const submitData = (event: MouseEvent) => {
	event.preventDefault();

	const themeDataParsed = parseGameData(getRawData().split("\n"));

	const postData: FormData = new FormData();

	postData.append("themeName", getThemeName());
	postData.append("themeThumbnail", getTopicThumbnail());
	postData.append("themeDataParsed", JSON.stringify(themeDataParsed));
	postData.append("rawData", getRawData());
	postData.append("themeDataType", getTopicType() ?? "icon");
	postData.append("isVip", `${getIsVip()}`);
	postData.append("price", `${getPrice()}`);

	fetch("/api/game-topics", {
		method: "POST",
		body: postData,
	})
		.then((res: Response) => res.json())
		.then((res: IApiResponse) => {
			if (res.status === FetchStatus.SUCCESS) {
				setTimeout(() => {
					reload();
				}, 1500);
			} else {
				// show error message
				console.log(res.error);
			}
		});
};

export const handleSubmitData = () => {
	const submitButton = document.getElementById("submitButton");

	if (submitButton) {
		setIsVipListener();
		submitButton.addEventListener("click", submitData);
	}
};
