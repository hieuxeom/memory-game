import { HistoryCard } from "../../classes/History.js";
import { getUserId } from "../../ts-utils/General.js";
import { FetchStatus } from "../../types/Api.js";
const fetchUserHistory = async () => {
    const userId = getUserId();
    if (userId) {
        return await fetch(`/api/game-history/${userId}`)
            .then((res) => res.json())
            .then((res) => {
            if (res.status === FetchStatus.SUCCESS) {
                return res.data;
            }
        });
    }
};
const mapUserHistory = async (listUserHistory) => {
    return await Promise.all(listUserHistory.map(async (userHistory) => await new HistoryCard(userHistory).render()));
};
const loadUserHistory = async () => {
    const historyContainer = document.getElementById("historyContainer");
    if (historyContainer) {
        fetchUserHistory().then(async (userHistory) => {
            historyContainer.innerHTML = (await mapUserHistory(userHistory)).join("");
        });
    }
};
export const handleLoadUserHistory = () => {
    loadUserHistory();
};
