export const getCurrentGameSize = () => {
    if (!localStorage.getItem("gameSize")) {
        setGameSize();
    }
    return localStorage.getItem("gameSize");
};
export const setGameSize = (size = "4x4") => {
    return localStorage.setItem("gameSize", size);
};
export const getCurrentGameMode = () => {
    if (!localStorage.getItem("gameMode")) {
        setGameMode();
    }
    return localStorage.getItem("gameMode");
};
export const setGameMode = (gameMode = "normal") => {
    return localStorage.setItem("gameMode", gameMode);
};
export const getCurrentGameTime = () => {
    if (!localStorage.getItem("gameTime")) {
        setGameTime();
    }
    return localStorage.getItem("gameTime");
};
export const setGameTime = (time = "60") => {
    return localStorage.setItem("gameTime", time);
};
export const getCurrentGameTopic = () => {
    if (!localStorage.getItem("currentGameTopic")) {
        setGameTopic("65f9ddeeda69b11650c787d1");
    }
    return localStorage.getItem("currentGameTopic");
};
export const setGameTopic = (gameTopicId) => {
    localStorage.setItem("currentGameTopic", gameTopicId);
};
export const getCurrentCardTheme = () => {
    if (!localStorage.getItem("currentCardTheme")) {
        setCardTheme("65f1e86d709b790e9f9ad85c");
    }
    return localStorage.getItem("currentCardTheme");
};
export const setCardTheme = (cardThemeId) => {
    localStorage.setItem("currentCardTheme", cardThemeId);
};
const getDocumentCookies = () => {
    const cookies = document.cookie.split(";");
    const mapCookie = new Map();
    cookies.forEach((cookie) => mapCookie.set(cookie.split("=")[0].trim(), cookie.split("=")[1]));
    return mapCookie;
};
export const getUserData = () => {
    if (localStorage.getItem("userData")) {
        return JSON.parse(localStorage.getItem("userData"));
    }
    else {
        return undefined;
    }
};
export const setUserData = (userData) => {
    return localStorage.setItem("userData", JSON.stringify(userData));
};
export const getSearchParams = (key) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key) ?? undefined;
};
export const getUserId = () => {
    if (getUserData()) {
        return getUserData()?._id || undefined;
    }
};
export const generateGuestId = () => {
    return `guestPlayer${Date.now()}`;
};
export const setLocalGuestId = (_id) => {
    return localStorage.setItem("guestId", _id);
};
export const getLocalGuestId = () => {
    return localStorage.getItem("guestId") || undefined;
};
export const getListVipCards = () => {
    const userData = getUserData();
    if (userData) {
        return userData.userVipItems.cardThemes;
    }
    return [];
};
export const getListVipGames = () => {
    const userData = getUserData();
    if (userData) {
        return userData.userVipItems.gameTopics;
    }
    return [];
};
export const setCookie = (name, value) => {
    return (document.cookie = `${name}=${value}; Path=/`);
};
export const deleteCookie = (name) => {
    return (document.cookie = `${name}=; Max-Age=0`);
};
export const isOwned = (themeId, userInventory) => {
    return userInventory.includes(themeId);
};
export const convertTime = (stringDate) => {
    const date = new Date(stringDate);
    return `${date.toLocaleTimeString("es-AR")} ${date.toLocaleDateString("es-AR")}`;
};
