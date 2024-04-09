import { getUserId, setUserData } from "../ts-utils/General.js";
import { Toast } from "../ts-utils/Toast.js";
import { FetchStatus } from "../types/Api.js";
const fetchReward = async () => {
    return await fetch(`/api/users/${getUserId()}/get-rewards`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            new Toast().success(res.message);
            return res.data;
        }
    });
};
const streakReward = (event) => {
    event.preventDefault();
    fetchReward().then((rewardData) => {
        setUserData(rewardData);
    });
};
export const handleStreakReward = () => {
    const streakButton = document.getElementById("userStreak");
    if (streakButton) {
        streakButton.addEventListener("click", streakReward);
    }
};
