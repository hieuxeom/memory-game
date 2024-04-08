import { deleteCookie, getUserData } from "../ts-utils/General.js";
import { auth } from "../auth/google/firebase.config.js";
// @ts-ignore
import { signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { direct } from "../ts-utils/Direct.js";
export const handleSignOut = () => {
    const userData = getUserData();
    if (userData) {
        const signOutButton = document.getElementById("signOutButton");
        if (signOutButton) {
            const { provider } = userData;
            if (provider === "google") {
                signOutButton.addEventListener("click", () => {
                    signOut(auth).then((res) => {
                        deleteCookie("_id");
                        direct("/auth/signout");
                    });
                });
            }
            else {
                signOutButton.addEventListener("click", () => {
                    direct("/auth/signout");
                });
            }
        }
    }
};
