import { getUserData, getUserId } from "../ts-utils/General.js";
import { direct } from "../ts-utils/Direct.js";
import { Toast } from "../ts-utils/Toast.js";
import { passWordRegex } from "../ts-utils/Regex.js";
const handleChangePwd = (oldPwd, newPwd) => {
    const _id = getUserId();
    let postData = {
        _id,
        oldPwd,
        newPwd
    };
    fetch("/api/auth/change-pwd", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
    })
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            new Toast().success(res.message);
        }
        else {
            new Toast().error(res.message);
        }
    });
};
const userData = getUserData();
if (userData) {
    const uOldPassword = document.getElementById("uOldPassword");
    const uNewPassword = document.getElementById("uNewPassword");
    const uReNewPassword = document.getElementById("uReNewPassword");
    const submitChangePwd = document.getElementById("submitChangePwd");
    const handleCheckValid = () => {
        if (!uOldPassword.value) {
            new Toast().error("Please enter your old password");
            return false;
        }
        if (!uNewPassword.value) {
            new Toast().error("Please enter your new password");
            return false;
        }
        else if (!passWordRegex.test(uNewPassword.value)) {
            new Toast().error("Password must be at least 6 characters and contain: uppercase letters, lowercase letters and numbers");
            return false;
        }
        if (uReNewPassword.value !== uNewPassword.value) {
            new Toast().error("Password doesn't match");
            return false;
        }
        return true;
    };
    const handleResetForm = () => {
        uOldPassword.value = "";
        uNewPassword.value = "";
        uReNewPassword.value = "";
    };
    submitChangePwd.addEventListener("click", (e) => {
        e.preventDefault();
        if (handleCheckValid()) {
            if (uNewPassword.value === uReNewPassword.value) {
                handleChangePwd(uOldPassword.value, uNewPassword.value);
                handleResetForm();
            }
        }
    });
}
else {
    direct("/auth");
}
