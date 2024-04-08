import { auth, provider } from "./firebase.config.js";
// @ts-ignore
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { FetchStatus } from "../../types/Api.js";
import { getUserData, setCookie, setUserData } from "../../ts-utils/General.js";
import { direct } from "../../ts-utils/Direct.js";
const isLogin = () => {
    if (getUserData()) {
        return direct("/profile");
    }
    return false;
};
const handleLoginWithGoogle = () => {
    if (!isLogin()) {
        const loginWithGoogle = document.getElementById("loginWithGoogle");
        loginWithGoogle.addEventListener("click", () => {
            signInWithPopup(auth, provider)
                .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const postData = {
                    displayName,
                    email,
                    photoURL,
                    password: "none",
                    provider: "google",
                };
                fetch("/api/auth/googleSignIn", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                })
                    .then((res) => {
                    if (res.status !== 400) {
                        return res.json();
                    }
                    else {
                        return null;
                    }
                })
                    .then((res) => {
                    if (res && res.status === FetchStatus.SUCCESS) {
                        let { userData } = res.data;
                        setUserData(userData);
                        setCookie("_id", userData._id);
                        direct("/profile");
                    }
                });
            })
                .catch((error) => {
                console.log(error);
            });
        });
    }
};
handleLoginWithGoogle();
