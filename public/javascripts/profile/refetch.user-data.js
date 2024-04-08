import { reload } from "../ts-utils/Direct.js";
import { getUserId, setUserData } from "../ts-utils/General.js";
import { FetchStatus } from "../types/Api.js";
const fetchUserData = async () => {
    return await fetch(`/api/users/${getUserId()}`)
        .then((res) => res.json())
        .then((res) => {
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
    const refetchButton = document.getElementById("refetchUserData");
    if (refetchButton) {
        refetchButton.addEventListener("click", refetchData);
    }
};
