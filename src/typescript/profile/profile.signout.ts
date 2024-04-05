import {deleteCookie, getUserData} from "../ts-utils/General.js";
import {auth} from "../auth/google/firebase.config.js";
// @ts-ignore
import {signOut} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {direct} from "../ts-utils/Direct.js";

export const handleSignOut = () => {
    const userData = getUserData()

    if (userData) {

        const signOutButton: HTMLButtonElement = document.getElementById("signOutButton") as HTMLButtonElement;

        if (signOutButton) {
            const {provider} = userData;
            if (provider === "google") {
                signOutButton.addEventListener("click", () => {
                    signOut(auth).then((res: any) => {
                        deleteCookie("_id")
                        direct("/auth/signout");
                    });
                });
            } else {
                signOutButton.addEventListener("click", () => {
                    direct("/auth/signout");
                })
            }
        }

    }
}