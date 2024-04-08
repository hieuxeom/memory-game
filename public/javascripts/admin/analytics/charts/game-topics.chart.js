export const getGameThemeData = () => {
	return new Promise((resolve, reject) => {
		fetch("/api/charts/game-topics")
			.then((res) => res.json())
			.then((res) => {
				if (res.status === "success") {
					resolve(res.data);
				}
			});
	});
};
