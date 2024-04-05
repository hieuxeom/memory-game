import {auth, provider} from "./firebase.config.js";
// @ts-ignore
import {signInWithPopup, OAuthCredential} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {FetchStatus, IApiResponse} from "../../types/Api.js";
import {getUserData, setCookie, setUserData} from "../../ts-utils/General.js";
import {direct} from "../../ts-utils/Direct.js";

const isLogin = () => {
    if (getUserData()) {
        return direct("/profile");
    }
    return false;
}

const handleLoginWithGoogle = () => {
    if (!isLogin()) {
        const loginWithGoogle: HTMLElement = document.getElementById("loginWithGoogle") as HTMLElement;
        loginWithGoogle.addEventListener("click", () => {
            signInWithPopup(auth, provider)
                .then((result: OAuthCredential) => {
                    const {displayName, email, photoURL} = result.user;

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
                        .then((res: Response) => {
                            if (res.status !== 400) {
                                return res.json()
                            } else {
                                return null
                            }
                        })
                        .then((res: IApiResponse) => {
                            if (res && res.status === FetchStatus.SUCCESS) {

                                let {userData} = res.data;

                                setUserData(userData);

                                setCookie("_id", userData._id);

                                direct("/profile");
                            }
                        })
                    ;
                })
                .catch((error: OAuthCredential) => {
                    console.log(error);
                });
        });
    }

}
handleLoginWithGoogle();



