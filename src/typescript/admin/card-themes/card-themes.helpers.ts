import { FetchStatus, IApiResponse, ICardTheme } from "../../types/Api.js";
import { direct, reload } from "../../ts-utils/Direct.js";

export const FetchString: Record<string, string> = {
	default: "/api/card-themes",
	alphabets: "/api/card-themes?filter=alphabets",
	deleted: "/api/card-themes?filter=deleted",
};

export const fetchListCardThemes = async (filter: string): Promise<ICardTheme[]> => {
	return await fetch(FetchString[filter])
		.then((res: Response) => res.json())
		.then((res: IApiResponse) => {
			if (res.status === FetchStatus.SUCCESS) {
				return res.data;
			}
		});
};

export const fetchListDeletedCardThemes = async (): Promise<ICardTheme[]> => {
	return await fetch(FetchString["deleted"])
		.then((res: Response) => res.json())
		.then((res: IApiResponse) => {
			if (res.status === FetchStatus.SUCCESS) {
				return res.data;
			}
		});
};

export const fetchThemeById = async (_id: string): Promise<ICardTheme> => {
	return await fetch(`/api/card-themes/${_id}`)
		.then((res: Response) => res.json())
		.then((res: IApiResponse) => {
			if (res.status === FetchStatus.SUCCESS) {
				return res.data;
			}
		});
};

export const mapDeleteButton = () => {
	const listButtons = document.querySelectorAll(".delete-button");

	listButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const cardThemeId = button.getAttribute("data-id");
			fetch(`/api/card-themes/${cardThemeId}/delete`, {
				method: "PUT",
			})
				.then((res) => res.json())
				.then((res: IApiResponse) => {
					if (res.status === "redirect") {
						reload();
					}
				})
				.catch((err) => {
					console.error(err);
				});
		});
	});
};

export const mapPermanentlyDeleteButton = () => {
	const listButtons = document.querySelectorAll(".delete-button");

	listButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const cardThemeId = button.getAttribute("data-id");
			fetch(`/api/card-themes/${cardThemeId}`, {
				method: "DELETE",
			})
				.then((res: Response) => res.json())
				.then((res: IApiResponse) => {
					if (res.status === "redirect") {
						reload();
					}
				});
		});
	});
};

export const mapRecoverButton = () => {
	const listButtons = document.querySelectorAll(".recover-button");
	listButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const cardThemeId = button.getAttribute("data-id");
			fetch(`/api/card-themes/${cardThemeId}/recover`, {
				method: "PUT",
			})
				.then((res) => res.json())
				.then((res: IApiResponse) => {
					if (res.status === "redirect") {
						reload();
					}
				})
				.catch((err) => {
					console.error(err);
				});
		});
	});
};

export const mapEditButton = () => {
	const listButtons = document.querySelectorAll(".edit-button");

	listButtons.forEach((button) => {
		button.addEventListener("click", () => {
			direct(`/admin/card-themes/edit?_id=${button.getAttribute("data-id")}`);
		});
	});
};

const setViewData = async (_id: string) => {
	const { cardFront, cardBack } = await fetchThemeById(_id);

	const frontFace = document.getElementById("frontFaceImage") as HTMLImageElement;
	const backFace = document.getElementById("backFaceImage") as HTMLImageElement;

	if (frontFace) {
		frontFace.src = `/images/themepacks/${cardFront}`;
	}

	if (backFace) {
		backFace.src = `/images/themepacks/${cardBack}`;
	}
};

export const mapViewButton = async () => {
	const listButtons = document.querySelectorAll(".view-button");

	listButtons.forEach((button) => {
		button.addEventListener("click", () => {
			setViewData(button.getAttribute("data-id")!);
		});
	});
};

export const setThemeName = (themeName: string) => {
	const themeNameInput: HTMLInputElement = document.getElementById("themeName") as HTMLInputElement;
	return (themeNameInput.value = themeName);
};

export const getThemeName = () => {
	const themeNameInput: HTMLInputElement = document.getElementById("themeName") as HTMLInputElement;
	return themeNameInput.value;
};

export const setIsVip = (checked: boolean) => {
	const isVipCheck: HTMLInputElement = document.getElementById("isVip") as HTMLInputElement;
	setDisablePrice(!checked);
	return (isVipCheck.checked = checked);
};

export const setIsVipListener = () => {
	const isVipCheck: HTMLInputElement = document.getElementById("isVip") as HTMLInputElement;
	setDisablePrice(!getIsVip());
	isVipCheck.addEventListener("click", () => {
		setDisablePrice(!getIsVip());
	});
};
export const getIsVip = () => {
	const isVipCheck: HTMLInputElement = document.getElementById("isVip") as HTMLInputElement;
	return isVipCheck.checked;
};

export const setPrice = (price: number) => {
	const priceElement: HTMLInputElement = document.getElementById("price") as HTMLInputElement;
	return (priceElement.value = `${price}`);
};

export const setDisablePrice = (isDisabled: boolean) => {
	const priceElement: HTMLInputElement = document.getElementById("price") as HTMLInputElement;
	return (priceElement.disabled = isDisabled);
};

export const getPrice = () => {
	const priceElement: HTMLInputElement = document.getElementById("price") as HTMLInputElement;
	if (getIsVip()) {
		return priceElement.value;
	} else {
		return "0";
	}
};

export const setCurrentImageData = (cardFront: string, cardBack: string) => {
	const frontFace = document.getElementById("frontFaceImage") as HTMLImageElement;
	const backFace = document.getElementById("backFaceImage") as HTMLImageElement;

	if (frontFace) {
		frontFace.src = `/images/themepacks/${cardFront}`;
	}

	if (backFace) {
		backFace.src = `/images/themepacks/${cardBack}`;
	}
};

export const getThemeId = () => {
	const themeIdElement: HTMLInputElement = document.getElementById("themeId") as HTMLInputElement;
	return themeIdElement.value;
};

export const getFrontFaceFile = () => {
	const cardFront: HTMLInputElement = document.getElementById("cardFront") as HTMLInputElement;
	return cardFront.files ? cardFront.files[0] : "";
};

export const getBackFaceFile = () => {
	const cardBack: HTMLInputElement = document.getElementById("cardBack") as HTMLInputElement;
	return cardBack.files ? cardBack.files[0] : "";
};
