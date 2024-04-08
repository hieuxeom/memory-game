import { reload } from "../ts-utils/Direct.js";
import { getUserId, setUserData } from "../ts-utils/General.js";
import { FetchStatus, IApiResponse } from "../types/Api.js";

const fetchUserData = async () => {
	return await fetch(`/api/users/${getUserId()}`)
		.then((res: Response) => res.json())
		.then((res: IApiResponse) => {
			if (res.status === FetchStatus.SUCCESS) {
				return res.data;
			}
		});
};

const refetchData = () => {
	fetchUserData().then((userData) => {
		setUserData(userData);
		reload();
	});
};

export const handleRefetchData = () => {
	const refetchButton: HTMLButtonElement = document.getElementById("refetchUserData") as HTMLButtonElement;
	if (refetchButton) {
		refetchButton.addEventListener("click", refetchData);
	}
};
