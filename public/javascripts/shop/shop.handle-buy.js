import { Toast } from "../ts-utils/Toast.js";
import { reload } from "../ts-utils/Direct.js";
export const handleBuyAction = (postData) => {
    const buyButton = document.getElementById("buyButton");
    buyButton.addEventListener("click", () => {
        fetch("/api/shop", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData),
        }).then((res) => res.json())
            .then((res) => {
            if (res.status === "success") {
                localStorage.setItem("userData", JSON.stringify(res.data));
                const toast = new Toast(() => {
                    reload();
                });
                if (res.message) {
                    toast.success(res.message);
                }
            }
            else {
                const toast = new Toast();
                toast.error(res.message ?? "Error");
            }
        });
    });
};
