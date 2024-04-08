import { FetchStatus } from "../../types/Api.js";
import { direct, reload } from "../../ts-utils/Direct.js";
import { fetchThemeById } from "../card-themes/card-themes.helpers.js";
import { getCurrentCardTheme } from "../../ts-utils/General.js";
export const fetchGameTopics = async () => {
    return await fetch("/api/game-topics")
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
export const fetchGameTopicsDeleted = async () => {
    return await fetch("/api/game-topics?filter=deleted")
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
export const fetchGameTopicsById = async (_id) => {
    return await fetch(`/api/game-topics/${_id}`)
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
            fetch(`/api/game-topics/${cardThemeId}/delete`, {
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
            const themeId = button.getAttribute("data-id");
            fetch(`/api/game-topics/${themeId}`, {
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
            fetch(`/api/game-topics/${cardThemeId}/recover`, {
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
            direct(`/admin/game-topics/edit?_id=${button.getAttribute("data-id")}`);
        });
    });
};
const generateThemeDataCard = ({ icon }, { cardFront }) => {
    return `<div class="card open relative bg-transparent shadow-lg h-[170px] rounded-lg overflow-hidden">
                <div class="bg-transparent card-front w-full h-full">
                    <div class="bg-transparent">
                        <img src="/images/themepacks/${cardFront}" class="w-full h-full" alt=""/>
                    </div>
                    <div class="bg-transparent absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <i class="${icon} text-4xl"></i>
                    </div>
                </div>
            </div>`;
};
const mapGameTopicItems = (gameTopicsData, cardThemeData) => {
    return gameTopicsData.map((data) => generateThemeDataCard(data, cardThemeData)).join("");
};
const setViewData = async (_id) => {
    const listItemsContainer = document.getElementById("listItemsContainer");
    if (listItemsContainer) {
        const gameTopicData = await fetchGameTopicsById(_id);
        const cardThemeData = await fetchThemeById(getCurrentCardTheme());
        const { themeData } = gameTopicData;
        listItemsContainer.innerHTML = mapGameTopicItems(themeData, cardThemeData);
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
export const getThemeId = () => {
    const themeId = document.getElementById("themeId");
    return themeId.value;
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
export const setRawData = (rawData) => {
    const themeData = document.getElementById("themeData");
    return (themeData.value = rawData);
};
export const getRawData = () => {
    const themeData = document.getElementById("themeData");
    return themeData.value;
};
export const getTopicThumbnail = () => {
    const topicThumbnail = document.getElementById("topicThumbnail");
    return topicThumbnail.files ? topicThumbnail.files[0] : "";
};
export const parseGameData = (gameData) => {
    return gameData.map((value) => {
        let tempString = value.split("|");
        if (tempString.length > 1) {
            return {
                icon: tempString[0],
                value: tempString[1],
            };
        }
        else {
            return {
                icon: tempString[0],
                value: tempString[0],
            };
        }
    });
};
export const getTopicType = () => {
    const listThemeTypes = document.getElementsByName("themeDataType");
    listThemeTypes.forEach((e) => {
        if (e.checked) {
            return e.value;
        }
    });
    return null;
};
