"use strict";
const difficultSizeButtons = document.querySelectorAll(".difficult-size");
const handleInActiveDifficultButton = () => {
    difficultSizeButtons.forEach((button) => {
        button.classList.remove("active");
    });
};
difficultSizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        var _a;
        handleInActiveDifficultButton();
        localStorage.setItem("difficult", (_a = button === null || button === void 0 ? void 0 : button.getAttribute("button-data")) !== null && _a !== void 0 ? _a : "");
        button.classList.add("active");
    });
});
