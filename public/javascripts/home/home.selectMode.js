import { getCurrentGameMode, setGameMode } from "../ts-utils/General.js";
const getModeList = () => {
    return document.querySelectorAll(".mode-button");
};
const handleUnSelectAllButton = () => {
    const listButton = getModeList();
    listButton.forEach((button) => {
        if (button.classList.contains("active")) {
            button.classList.remove("active");
        }
    });
};
const handleSelectButton = (button) => {
    setGameMode(button.getAttribute("data-button"));
    return button.classList.add("active");
};
export const defaultSelectMode = () => {
    const currentMode = getCurrentGameMode();
    const listButton = getModeList();
    listButton.forEach((button) => {
        if (button.getAttribute("data-button") === currentMode) {
            button.classList.add("active");
        }
    });
};
export const handleSelectMode = () => {
    defaultSelectMode();
    const listButton = getModeList();
    listButton.forEach((button) => {
        button.addEventListener("click", () => {
            handleUnSelectAllButton();
            handleSelectButton(button);
        });
    });
};
