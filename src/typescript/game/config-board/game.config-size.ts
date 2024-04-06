import {getCurrentGameSize, setGameSize} from "../../ts-utils/General.js";

const getListSizeButton = (): NodeListOf<HTMLButtonElement> => {
    return document.querySelectorAll(".size-button");
}

const handleUnSelectSizeButton = () => {
    const listButton = getListSizeButton();
    listButton.forEach((button) => {
        if (button.classList.contains("active")) {
            button.classList.remove("active");
        }
    })
}

const handleSelectSizeButton = (button: HTMLButtonElement) => {
    setGameSize(button.getAttribute("data-button")!);
    return button.classList.add("active");
}

export const defaultSelectSize = () => {
    const listButton = getListSizeButton();
    const currentSize = getCurrentGameSize();

    listButton.forEach((button) => {
        if (button.getAttribute("data-button") === currentSize) {
            handleUnSelectSizeButton();
            handleSelectSizeButton(button);
            return;
        }
    })
}
export const selectSize = () => {
    const listButton = getListSizeButton();
    listButton.forEach((button) => button.addEventListener("click", (() => {
        handleUnSelectSizeButton();
        handleSelectSizeButton(button);
    })));
}