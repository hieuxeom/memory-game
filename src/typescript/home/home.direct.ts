import {direct} from "../ts-utils/Direct.js";

export const handeDirectButton = () => {
    const viewShopButton = document.getElementById("directShopButton");
    const directRankButton = document.getElementById("directRankButton")
    const directInventoryButton = document.getElementById("directInventoryButton")
    const directProfileButton = document.getElementById("directProfileButton")
    const playGame = document.getElementById("playGame")

    if (viewShopButton) {
        viewShopButton.addEventListener("click", () => {
            direct("/shop")
        })
    }

    if (directProfileButton) {
        directProfileButton.addEventListener("click", () => {
            direct("/profile")
        })
    }

    if (directRankButton) {
        directRankButton.addEventListener("click", () => {
            direct("/ranking")
        })
    }

    if (directInventoryButton) {
        directInventoryButton.addEventListener("click", () => {
            direct("/inventory")
        })
    }

    if (playGame) {
        playGame.addEventListener("click", () => {
            direct("/play")
        })
    }
}