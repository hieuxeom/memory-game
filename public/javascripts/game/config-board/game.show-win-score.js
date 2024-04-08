import { getCurrentGameSize, getCurrentGameTime } from "../../ts-utils/General.js";
const getScoreWin = (gameSize, gameTime) => {
    switch (gameTime) {
        case "60":
            if (gameSize === "4x4") {
                return 1500;
            }
            else {
                return 2000;
            }
        case "120":
            if (gameSize === "4x4") {
                return 3250;
            }
            else {
                return 3500;
            }
        case "300":
            if (gameSize === "4x4") {
                return 7500;
            }
            else {
                return 8000;
            }
    }
    return 0;
};
export const setWinScore = () => {
    const winScoreContainer = document.getElementById("winScoreContainer");
    const winScore = document.getElementById("winScore");
    if (winScoreContainer) {
        winScoreContainer.classList.remove("hidden");
        winScore.innerHTML = `${getScoreWin(getCurrentGameSize(), getCurrentGameTime())}`;
    }
};
