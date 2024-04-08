import { getBackFaceFile, getFrontFaceFile, getIsVip, getPrice, getThemeId, getThemeName } from "../card-themes.helpers.js";
import { Toast } from "../../../ts-utils/Toast.js";
import { reload } from "../../../ts-utils/Direct.js";
const submitData = (event) => {
    event.preventDefault();
    const themeId = getThemeId();
    if (!themeId) {
        return new Toast().error("Missing themeId");
    }
    const editData = new FormData();
    editData.append("themeId", themeId);
    editData.append("themeName", getThemeName());
    editData.append("cardFront", getFrontFaceFile());
    editData.append("cardBack", getBackFaceFile());
    editData.append("isVip", `${getIsVip()}`);
    editData.append("price", `${getPrice()}`);
    const requestOptions = {
        method: "PUT",
        body: editData,
    };
    fetch("/api/card-themes", requestOptions)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "redirect") {
            const toast = new Toast(() => {
                reload();
            });
            toast.success(res.message);
        }
        else {
            console.log(res);
        }
    });
};
export const handleSubmitData = () => {
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
        submitButton.addEventListener("click", submitData);
    }
};
