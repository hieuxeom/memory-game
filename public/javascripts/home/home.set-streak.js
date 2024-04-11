import { setUserData } from "./../ts-utils/General.js";
import { getLastLogin, getUserData, getUserId, getUserStreak } from "../ts-utils/General.js";
import { FetchStatus } from "../types/Api.js";
const isCurrentDate = (checkDay) => {
    const currentDate = new Date();
    return (checkDay.getDate() === currentDate.getDate() &&
        checkDay.getMonth() === currentDate.getMonth() &&
        checkDay.getFullYear() === currentDate.getFullYear());
};
const fetchNewData = async () => {
    return await fetch(`/api/users/${getUserId()}/streak`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
const setStreak = () => {
    const userStreakElement = document.getElementById("userStreak");
    if (userStreakElement) {
        return (userStreakElement.innerHTML = `${getUserStreak()} day(s)`);
    }
};
const getListStreakButtons = () => {
    return document.querySelectorAll(".streak-button");
};
const isInRange = (streakButton, streakValue) => {
    const range = streakButton.getAttribute("data-streak");
    console.log("🚀 ~ isInRange ~ range:", range);
    if (range?.split("-").length === 2) {
        const min = Number(range.split("-")[0]);
        const max = Number(range.split("-")[1]);
        if (streakValue >= min && streakValue <= max) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (Number(range) === 1 && streakValue === 1) {
            return true;
        }
        else if (Number(range) === 10) {
            return streakValue >= Number(range);
        }
    }
    return false;
};
const setStreakBoard = () => {
    const listStreakButton = getListStreakButtons();
    if (listStreakButton) {
        const userStreak = getUserStreak();
        listStreakButton.forEach((button) => {
            if (isInRange(button, userStreak)) {
                button.classList.add("active");
            }
        });
    }
};
const hideStreakBoard = () => {
    const streakBoard = document.getElementById("streakBoard");
    console.log("🚀 ~ hideStreakBoard ~ streakBoard:", streakBoard);
    return streakBoard.classList.add("hidden");
};
const showStreakBoard = () => {
    const streakBoard = document.getElementById("streakBoard");
    return streakBoard.classList.remove("hidden");
};
export const handleSetStreak = async () => {
    const userData = getUserData();
    console.log("🚀 ~ handleSetStreak ~ getUserData:", getUserData);
    if (userData) {
        showStreakBoard();
        if (isCurrentDate(new Date(getLastLogin()))) {
            setStreak();
        }
        else {
            setUserData(await fetchNewData());
            setStreak();
        }
        setStreakBoard();
    }
    else {
        hideStreakBoard();
    }
};
