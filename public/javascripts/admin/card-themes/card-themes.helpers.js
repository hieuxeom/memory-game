import { FetchStatus } from "../../types/Api.js";
import { direct, reload } from "../../ts-utils/Direct.js";
export const FetchString = {
    default: "/api/card-themes",
    alphabets: "/api/card-themes?filter=alphabets",
    deleted: "/api/card-themes?filter=deleted",
};
export const fetchListCardThemes = async (filter) => {
    return await fetch(FetchString[filter])
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
export const fetchListDeletedCardThemes = async () => {
    return await fetch(FetchString["deleted"])
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
export const fetchThemeById = async (_id) => {
    return await fetch(`/api/card-themes/${_id}`)
        .then((res) => res.json())
        .then((res) => {
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
                .then((res) => {
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
                .then((res) => res.json())
                .then((res) => {
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
                .then((res) => {
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
const setViewData = async (_id) => {
    const { cardFront, cardBack } = await fetchThemeById(_id);
    const frontFace = document.getElementById("frontFaceImage");
    const backFace = document.getElementById("backFaceImage");
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
            setViewData(button.getAttribute("data-id"));
        });
    });
};
export const setThemeName = (themeName) => {
    const themeNameInput = document.getElementById("themeName");
    return (themeNameInput.value = themeName);
};
export const getThemeName = () => {
    const themeNameInput = document.getElementById("themeName");
    return themeNameInput.value;
};
export const setIsVip = (checked) => {
    const isVipCheck = document.getElementById("isVip");
    setDisablePrice(!checked);
    return (isVipCheck.checked = checked);
};
export const setIsVipListener = () => {
    const isVipCheck = document.getElementById("isVip");
    setDisablePrice(!getIsVip());
    isVipCheck.addEventListener("click", () => {
        setDisablePrice(!getIsVip());
    });
};
export const getIsVip = () => {
    const isVipCheck = document.getElementById("isVip");
    return isVipCheck.checked;
};
export const setPrice = (price) => {
    const priceElement = document.getElementById("price");
    return (priceElement.value = `${price}`);
};
export const setDisablePrice = (isDisabled) => {
    const priceElement = document.getElementById("price");
    return (priceElement.disabled = isDisabled);
};
export const getPrice = () => {
    const priceElement = document.getElementById("price");
    if (getIsVip()) {
        return priceElement.value;
    }
    else {
        return "0";
    }
};
export const setCurrentImageData = (cardFront, cardBack) => {
    const frontFace = document.getElementById("frontFaceImage");
    const backFace = document.getElementById("backFaceImage");
    if (frontFace) {
        frontFace.src = `/images/themepacks/${cardFront}`;
    }
    if (backFace) {
        backFace.src = `/images/themepacks/${cardBack}`;
    }
};
export const getThemeId = () => {
    const themeIdElement = document.getElementById("themeId");
    return themeIdElement.value;
};
export const getFrontFaceFile = () => {
    const cardFront = document.getElementById("cardFront");
    return cardFront.files ? cardFront.files[0] : "";
};
export const getBackFaceFile = () => {
    const cardBack = document.getElementById("cardBack");
    return cardBack.files ? cardBack.files[0] : "";
};
