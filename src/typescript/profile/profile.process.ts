import {IUser} from "../types/User.js";
import {IApiResponse} from "../types/Api.js";
import {getUserData} from "../ts-utils/General.js";
import {direct} from "../ts-utils/Direct.js";
import {handleSignOut} from "./profile.signout.js";

function isIUser(userData: IUser | string): userData is IUser {
    return (userData as IUser)._id !== undefined;
}

const userData = getUserData();
console.log(userData);

if (!userData) {
    direct("/auth");
} else {
    handleSignOut();
    const userAvatar: HTMLImageElement = document.getElementById("userAvatar") as HTMLImageElement;
    const displayNameValue: HTMLElement = document.getElementById("displayName") as HTMLElement;
    const gamePlayedValue: HTMLElement = document.getElementById("gamePlayed") as HTMLElement;
    const bestTimeValue: HTMLElement = document.getElementById("highestScore") as HTMLElement;
    const averageTimeValue: HTMLElement = document.getElementById("averageScore") as HTMLElement;
    const emailValue: HTMLElement = document.getElementById("email") as HTMLElement;
    const mostPlayedSizeValue: HTMLElement = document.getElementById("mostPlayedSize") as HTMLElement
    const mostPlayedTimeValue: HTMLElement = document.getElementById("mostPlayedTime") as HTMLElement

    if (isIUser(userData)) {
        const {_id, provider} = userData;

        if (provider !== "credentials") {
            (document.getElementById("changePassword") as HTMLElement).style.display = "none";
        }

        fetch(`/api/users/${_id}`)
            .then((res: Response) => res.json())
            .then((res: IApiResponse) => {
                if (res.status === "success") {
                    const {averageScore, highestScore, displayName, email, gamePlayed, photoURL, mostPlayedSize, mostPlayedTime} = res.data;
                    userAvatar.src = photoURL;
                    displayNameValue.innerHTML = displayName;
                    gamePlayedValue.innerHTML = gamePlayed.toString();
                    bestTimeValue.innerHTML = highestScore.toString();
                    averageTimeValue.innerHTML = averageScore?.toFixed(2) ?? "-";
                    emailValue.innerHTML = email;
                    mostPlayedSizeValue.innerHTML = mostPlayedSize ?? "-";
                    mostPlayedTimeValue.innerHTML = mostPlayedTime?.toString() ?? "-";
                }
            });
    } else {
        direct("/auth");
    }
}




