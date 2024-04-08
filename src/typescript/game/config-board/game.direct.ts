import { direct } from "../../ts-utils/Direct.js";

export const handleDirectButton = () => {
	const backToHomeButton = document.getElementById("backToHome");
	const startGameButton = document.getElementById("startGame");
	if (backToHomeButton) {
		backToHomeButton.addEventListener("click", () => {
			direct("/");
		});
	}

	if (startGameButton) {
		startGameButton.addEventListener("click", () => {
			direct("/game/play");
		});
	}
};
