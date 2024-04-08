export class Toast {
	toastContainer: HTMLElement | null;
	closeCallback?: () => void;

	constructor(closeCallback?: () => void) {
		this.toastContainer = document.getElementById("toastContainer");
		if (closeCallback) {
			this.closeCallback = closeCallback;
		}
	}

	private createToast(message: string, type: string) {
		const toastContent = document.createElement("div");
		toastContent.setAttribute("id", "toastContent");
		toastContent.innerHTML = message;
		toastContent.classList.add("max-w-[350px]", type === "success" ? "bg-success" : "bg-danger", "text-white", "p-4", "rounded-xl");
		toastContent.style.animation = "slideInRight 0.5s ease forwards";

		if (this.toastContainer) {
			this.toastContainer.appendChild(toastContent);
			setTimeout(() => {
				toastContent.style.animation = "slideOutRight 0.5s ease forwards";
				setTimeout(() => {
					this.toastContainer?.removeChild(toastContent);
					if (this.closeCallback) {
						this.closeCallback();
					}
				}, 1000);
			}, 1500);
		} else {
			console.log("Cant find toast container");
		}
	}

	success(message: string) {
		return this.createToast(message, "success");
	}

	error(message: string) {
		return this.createToast(message, "error");
	}
}
