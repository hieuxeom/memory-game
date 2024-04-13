export const getRangeGameScore = () => {
	return new Promise((resolve, reject) => {
		fetch("/api/charts/score-range")
			.then((res) => res.json())
			.then((res) => {
				if (res.status === "success") {
					resolve(res.data);
				}
			});
	});
};

export const getHighestGameScoreAllTime = () => {
	return new Promise((resolve, reject) => {
		fetch("/api/charts/highest-score-all-time")
			.then((res) => res.json())
			.then((res) => {
				if (res.status === "success") {
					resolve(res.data);
				}
			});
	});
};
