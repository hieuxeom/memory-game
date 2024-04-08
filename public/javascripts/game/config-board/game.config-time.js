import { getCurrentGameTime, setGameTime } from "../../ts-utils/General.js";
const getListTimeButton = () => {
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
const handleSelectTimeButton = (button) => {
    setGameTime(button.getAttribute("data-button"));
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
            console.log(button);
            handleUnSelectTimeButton();
            handleSelectTimeButton(button);
        });
    });
};
