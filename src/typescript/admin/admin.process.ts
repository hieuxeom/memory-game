import {direct} from "../ts-utils/Direct.js";

const listTabButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".admin-tab")

const handleDirectTab = (listTabButtons: NodeListOf<HTMLButtonElement>) => {
    listTabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            direct(`/admin/${button.getAttribute("data-tab")}`);
        })
    })
}

const handleActiveTab = (listTabButtons: NodeListOf<HTMLButtonElement>) => {
    listTabButtons.forEach(button => {
        if (window.location.pathname.includes(button.getAttribute("data-tab")!)) {
            button.classList.add("active")
        } else {
            button.classList.remove("active")

        }
    })
}

if (listTabButtons) {
    handleDirectTab(listTabButtons);
    handleActiveTab(listTabButtons);
}
