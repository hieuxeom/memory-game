const difficultSizeButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".difficult-size");

const handleInActiveDifficultButton = () => {
	difficultSizeButtons.forEach((button) => {
		button.classList.remove("active");
	});
};

difficultSizeButtons.forEach((button) => {
	button.addEventListener("click", () => {
		handleInActiveDifficultButton();
		localStorage.setItem("difficult", button?.getAttribute("button-data") ?? "");
		button.classList.add("active");
	});
});
