import { getSearchParams } from "../ts-utils/General.js";
import { FetchStatus, IApiResponse } from "../types/Api.js";
import { IRankData } from "../types/Rank.js";

const fetchRankData = async (filter: string) => {
	return await fetch(`/api/ranks?filter=${filter}`)
		.then((res: Response) => res.json())
		.then((res: IApiResponse) => {
			if (res.status === FetchStatus.SUCCESS) {
				return res.data;
			}
		});
};

const generateRankRow = ({ displayName, gameScore }: IRankData, index: number) => {
	return `<div class="flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow-md">
                <div class="flex items-center gap-4 ${index + 1 < 2 ? "text-primary" : "text-secondary"}">
                    <div id="position" class="text-xl ">${index + 1}.</div>
                    <div id="playerName" class="text-xl">${displayName}</div>
                </div>
                <div>
                    <div id="gameScore" class="text-xl ${index + 1 < 2 ? "text-primary" : "text-secondary"}">${gameScore}</div>
                </div>
            </div>`;
};
export const loadRankData = async () => {
	const currentFilter = getSearchParams("tab") ?? "overall";
	const listRankContainer: HTMLElement = document.getElementById("listRankContainer") as HTMLElement;

	if (listRankContainer) {
		let rankData: null | IRankData[] = null;
		rankData = await fetchRankData(currentFilter);

		if (rankData) {
			listRankContainer.innerHTML = rankData
				.map((row, index) => {
					return generateRankRow(row, index);
				})
				.join("");
		}
	}
};
