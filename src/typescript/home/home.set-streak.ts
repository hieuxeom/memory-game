import { setUserData } from "./../ts-utils/General.js";
import { getLastLogin, getUserData, getUserId, getUserStreak } from "../ts-utils/General.js";
import { FetchStatus, IApiResponse } from "../types/Api.js";
import { IUser } from "../types/User.js";

const isCurrentDate = (checkDay: Date) => {
	const currentDate = new Date();

	return (
		checkDay.getDate() === currentDate.getDate() &&
		checkDay.getMonth() === currentDate.getMonth() &&
		checkDay.getFullYear() === currentDate.getFullYear()
	);
};

const fetchNewData = async (): Promise<IUser> => {
	return await fetch(`/api/users/${getUserId()}/streak`)
		.then((res: Response) => res.json())
		.then((res: IApiResponse) => {
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

const getListStreakButtons = (): NodeListOf<HTMLButtonElement> => {
	return document.querySelectorAll(".streak-button");
};

const isInRange = (streakButton: HTMLButtonElement, streakValue: number): boolean => {
	const range = streakButton.getAttribute("data-streak");
	console.log("🚀 ~ isInRange ~ range:", range);

	if (range?.split("-").length === 2) {
		const min = Number(range.split("-")[0]);
		const max = Number(range.split("-")[1]);

		if (streakValue >= min && streakValue <= max) {
			return true;
		} else {
			return false;
		}
	} else {
		if (Number(range) === 1 && streakValue === 1) {
			return true;
		} else if (Number(range) === 10) {
			return streakValue >= Number(range);
		}
	}
};

const setStreakBoard = () => {
	const listStreakButton: NodeListOf<HTMLButtonElement> = getListStreakButtons();

	if (listStreakButton) {
		const userStreak = getUserStreak()!;
		listStreakButton.forEach((button) => {
			if (isInRange(button, userStreak)) {
				button.classList.add("active");
			}
		});
	}
};

export const handleSetStreak = async () => {
	const userData = getUserData();

	if (userData) {
		// console.log("🚀 ~ handleSetStreak ~ getLastLogin():", typeof getLastLogin());

		if (isCurrentDate(new Date(getLastLogin()!))) {
			setStreak();
		} else {
			setUserData(await fetchNewData());
			setStreak();
		}
		setStreakBoard();
	}
};
