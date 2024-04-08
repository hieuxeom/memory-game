import { getCurrentGameMode, getCurrentGameTime, setGameTime } from "../../ts-utils/General.js";
import { setWinScore } from "./game.show-win-score.js";

const getListTimeButton = (): NodeListOf<HTMLButtonElement> => {
	return document.querySelectorAll(".time-button");
};

const handleUnSelectTimeButton = () => {
	const listButton = getListTimeButton();
	listButton.forEach((button) => {
		if (button.classList.contains("active")) {
			button.classList.remove("active");
		}
	});
};

const handleSelectTimeButton = (button: HTMLButtonElement) => {
	setGameTime(button.getAttribute("data-button")!);
	return button.classList.add("active");
};

export const defaultSelectTime = () => {
	const listButton = getListTimeButton();
	const currentTime = getCurrentGameTime();

	listButton.forEach((button) => {
		if (button.getAttribute("data-button") === currentTime) {
			handleUnSelectTimeButton();
			handleSelectTimeButton(button);
		}
	});
};

export const selectTime = () => {
	const listButton = getListTimeButton();
	console.log(listButton);

	listButton.forEach((button) => {
		button.addEventListener("click", () => {
			handleUnSelectTimeButton();
			handleSelectTimeButton(button);
			if (getCurrentGameMode() === "challenge") {
				setWinScore();
			}
		});
	});
};
