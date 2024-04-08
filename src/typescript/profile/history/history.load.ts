import { HistoryCard } from "../../classes/History.js";
import { getUserId } from "../../ts-utils/General.js";
import { FetchStatus, IApiResponse, IHistory } from "../../types/Api.js";

const fetchUserHistory = async () => {
	const userId = getUserId();

	if (userId) {
		return await fetch(`/api/game-history/${userId}`)
			.then((res: Response) => res.json())
			.then((res: IApiResponse) => {
				if (res.status === FetchStatus.SUCCESS) {
					return res.data;
				}
			});
	}
};

const mapUserHistory = async (listUserHistory: IHistory[]) => {
	return await Promise.all(listUserHistory.map(async (userHistory: IHistory) => await new HistoryCard(userHistory).render()));
};

const loadUserHistory = async () => {
	const historyContainer: HTMLElement = document.getElementById("historyContainer") as HTMLElement;
	if (historyContainer) {
		fetchUserHistory().then(async (userHistory: IHistory[]) => {
			historyContainer.innerHTML = (await mapUserHistory(userHistory)).join("");
		});
	}
};
export const handleLoadUserHistory = () => {
	loadUserHistory();
};
