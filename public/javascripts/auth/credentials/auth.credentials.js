import { setCookie, setUserData } from "../../ts-utils/General.js";
import { direct } from "../../ts-utils/Direct.js";
const uEmailLogin = document.getElementById("uEmail");
const uPasswordLogin = document.getElementById("uPassword");
const submitLogin = document.getElementById("submitLogin");
submitLogin.addEventListener("click", () => {
    let postData = {
        uEmail: uEmailLogin.value,
        uPassword: uPasswordLogin.value,
    };
    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
    })
        .then((res) => res.json())
        .then((res) => {
        if (res.status === "success") {
            let { userData } = res.data;
            setUserData(userData);
            setCookie("_id", userData._id);
            direct("/profile");
        }
        else {
            console.log(res?.message);
        }
    });
});
