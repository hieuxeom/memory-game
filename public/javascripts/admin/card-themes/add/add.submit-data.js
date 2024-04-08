import { reload } from "../../../ts-utils/Direct.js";
import { Toast } from "../../../ts-utils/Toast.js";
import { getBackFaceFile, getFrontFaceFile, getIsVip, getPrice, getThemeName, setIsVipListener } from "../card-themes.helpers.js";
const submitData = (event) => {
    event.preventDefault();
    if (!getThemeName()) {
        return new Toast().error("Missing theme name");
    }
    if (!getFrontFaceFile()) {
        return new Toast().error("Missing front-face file");
    }
    if (!getBackFaceFile()) {
        return new Toast().error("Missing back-face file");
    }
    const postData = new FormData();
    postData.append("themeName", getThemeName());
    postData.append("cardFront", getFrontFaceFile());
    postData.append("cardBack", getBackFaceFile());
    postData.append("isVip", `${getIsVip()}`);
    postData.append("price", `${getPrice()}`);
    const requestOptions = {
        method: "POST",
        body: postData,
    };
    fetch("/api/card-themes", requestOptions)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            const toast = new Toast(() => {
                reload();
            });
            toast.success(res.message);
        }
        else {
            new Toast().error(res.message);
        }
    });
};
export const handleSubmitData = () => {
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
        setIsVipListener();
        submitButton.addEventListener("click", submitData);
    }
};
