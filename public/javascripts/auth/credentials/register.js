import { emailRegex, passWordRegex } from "../../ts-utils/Regex.js";
import { Toast } from "../../ts-utils/Toast.js";
const uDisplayName = document.getElementById("uDisplayName");
const uDisplayNameValid = document.getElementById("uDisplayNameValid");
const uEmail = document.getElementById("uEmail");
const uEmailValid = document.getElementById("uEmailValid");
const uPassword = document.getElementById("uPassword");
const uPasswordValid = document.getElementById("uPasswordValid");
const uRePassword = document.getElementById("uRePassword");
const uRePasswordValid = document.getElementById("uRePasswordValid");
const submitRegister = document.getElementById("submitRegister");
const messageElement = document.getElementById("showMessage");
const handleCheckValid = () => {
    if (!uDisplayName.value) {
        new Toast().error("Display name is required");
        return false;
    }
    else {
        uDisplayNameValid.classList.add("hidden");
    }
    if (!uEmail.value) {
        new Toast().error("Email is required");
        return false;
    }
    else if (!emailRegex.test(uEmail.value)) {
        new Toast().error("You need to enter a valid email address");
        return false;
    }
    else {
        uEmailValid.classList.add("hidden");
    }
    if (!uPassword.value) {
        // showMessage(uPasswordValid, "This field is required");
        new Toast().error("Password is required");
        return false;
    }
    else if (!passWordRegex.test(uPassword.value)) {
        new Toast().error("Password must be at least 6 characters and contain: uppercase letters, lowercase letters and numbers");
        return false;
    }
    else {
        uPasswordValid.classList.add("hidden");
    }
    if (!uRePassword.value) {
        new Toast().error("Please retype password");
        return false;
    }
    else if (uRePassword.value !== uPassword.value) {
        new Toast().error("Two password doesn't match");
        return false;
    }
    else {
        uRePasswordValid.classList.add("hidden");
    }
    return true;
};
const handleRegister = () => {
    const userData = {
        displayName: uDisplayName.value,
        email: uEmail.value,
        password: uPassword.value,
        photoURL: "",
        provider: "credentials",
    };
    fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    }).then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            // showMessage(messageElement, res.message!, "success")
            new Toast().success(res.message);
            setTimeout(() => {
                window.location.href = "/auth/password";
            }, 2000);
        }
        else {
            new Toast().error(res.message);
        }
    });
};
submitRegister.addEventListener("click", (e) => {
    e.preventDefault();
    if (handleCheckValid()) {
        handleRegister();
    }
});
