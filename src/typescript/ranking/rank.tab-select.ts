import { direct } from "../ts-utils/Direct.js";
import { getSearchParams } from "../ts-utils/General.js";

const handleSelectDefault = () => {
	const tab = getSearchParams("tab") ?? "overall";
	const listTabButtons = getListTabButtons();
	listTabButtons.forEach((button) => {
		if (button.getAttribute("data-filter") === tab) {
			button.classList.remove("inactive");
			button.classList.add("active");
		} else {
			button.classList.add("inactive");
			button.classList.remove("active");
		}
	});
};

const getListTabButtons = (): NodeListOf<HTMLButtonElement> => {
	return document.querySelectorAll(".tab-button");
};

export const handleSelectTab = () => {
	handleSelectDefault();

	const listTabButtons = getListTabButtons();

	listTabButtons.forEach((button) => {
		button.addEventListener("click", () => {
			direct(`/ranking?tab=${button.getAttribute("data-filter")}`);
		});
	});
};
// handleSelectDefault();
