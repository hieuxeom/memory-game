export const getGameSizeData = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/charts/game-sizes")
            .then((res) => res.json())
            .then(res => {
                if (res.status === "success") {
                    resolve(res.data)
                }
            });
    });
};
