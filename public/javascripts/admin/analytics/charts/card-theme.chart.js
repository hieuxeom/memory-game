export const getCardThemeData = () => {
    return new Promise((resolve, reject) => {
        fetch("/api/charts/card-themes")
            .then((res) => res.json())
            .then(res => {
                if (res.status === "success") {
                    resolve(res.data)
                }
            });
    });
};
