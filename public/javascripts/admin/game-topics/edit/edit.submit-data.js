import { reload } from "../../../ts-utils/Direct.js";
import { getPrice, getRawData, getThemeId, getThemeName, getTopicThumbnail, parseGameData } from "../game-topics.helpers.js";
const submitData = (event) => {
    event.preventDefault();
    let themeDataType = null;
    const listThemeTypes = document.getElementsByName("themeDataType");
    listThemeTypes.forEach((e) => {
        if (e.checked) {
            themeDataType = e.value;
            return;
        }
    });
    const themeDataParsed = parseGameData(getRawData().split("\n"));
    const formData = new FormData();
    formData.append("themeId", getThemeId());
    formData.append("themeName", getThemeName());
    formData.append("themeThumbnail", getTopicThumbnail());
    formData.append("price", getPrice());
    formData.append("themeDataParsed", JSON.stringify(themeDataParsed));
    formData.append("rawData", getRawData());
    formData.append("themeDataType", themeDataType ?? "icon");
    fetch("/api/game-topics/", {
        method: "PUT",
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "redirect") {
            reload();
        }
    })
        .catch((err) => {
        console.log(err);
    });
};
export const handleSubmitData = () => {
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", submitData);
};
