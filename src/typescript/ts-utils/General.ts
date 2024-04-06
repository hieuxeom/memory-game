import {IUser} from "../types/User.js";

export const getCurrentGameSize = (): string => {
    if (!localStorage.getItem("gameSize")) {
        setGameSize();
    }
    return localStorage.getItem("gameSize")!;
}

export const setGameSize = (size: string = "4x4") => {
    return localStorage.setItem("gameSize", size);
}

export const getCurrentGameMode = (): string => {
    if (!localStorage.getItem("gameMode")) {
        setGameMode();
    }
    return localStorage.getItem("gameMode")!;
}

export const setGameMode = (gameMode: string = "normal") => {
    return localStorage.setItem("gameMode", gameMode)
}

export const getCurrentGameTime = (): string => {
    if (!localStorage.getItem("gameTime")) {
        setGameTime()
    }
    return localStorage.getItem("gameTime")!;
}

export const setGameTime = (time: string = "60") => {
    return localStorage.setItem("gameTime", time)
}

export const getCurrentGameTopic = (): string => {
    if (!localStorage.getItem("currentGameTopic")) {
        setGameTopic("65f9ddeeda69b11650c787d1")
    }
    return localStorage.getItem("currentGameTopic")!;
}

export const setGameTopic = (gameTopicId: string) => {
    localStorage.setItem("currentGameTopic", gameTopicId)
}

export const getCurrentCardTheme = (): string => {
    if (!localStorage.getItem("currentCardTheme")) {
        setCardTheme("65f1e86d709b790e9f9ad85c")
    }
    return localStorage.getItem("currentCardTheme")!;
}

export const setCardTheme = (cardThemeId: string) => {
    localStorage.setItem("currentCardTheme", cardThemeId)
}

const getDocumentCookies = (): Map<string, string> => {
    const cookies = document.cookie.split(";");

    const mapCookie: Map<string, string> = new Map();

    cookies.forEach(cookie => mapCookie.set(cookie.split("=")[0].trim(), cookie.split("=")[1]));

    return mapCookie;
}

export const getUserData = (): IUser | undefined => {
    if (localStorage.getItem("userData")) {
        return JSON.parse(localStorage.getItem("userData")!)
    } else {
        return undefined
    }
}

export const setUserData = (userData: IUser) => {
    return localStorage.setItem("userData", JSON.stringify(userData))
}

export const getSearchParams = (key: string): string | undefined => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key) ?? undefined
}

export const getUserId = (): string | undefined => {
    if (getUserData()) {
        return getUserData()?._id || undefined;
    }
}

export const generateGuestId = () => {
    return `guestPlayer${Date.now()}`
}

export const setLocalGuestId = (_id: string) => {
    return localStorage.setItem("guestId", _id)
}

export const getLocalGuestId = (): string | undefined => {
    return localStorage.getItem("guestId") || undefined
}

export const getListVipCards = (): string[] => {
    const userData = getUserData();
    if (userData) {
        return userData.userVipItems.cardThemes;
    }
    return []
}

export const getListVipGames = (): string[] => {
    const userData = getUserData();
    if (userData) {
        return userData.userVipItems.gameTopics;
    }
    return []
}

export const setCookie = (name: string, value: string) => {
    return document.cookie = `${name}=${value}; Path=/`
}

export const deleteCookie = (name: string) => {
    return document.cookie = `${name}=; Max-Age=0`
}

export const isOwned = (themeId: string, userInventory: string []): boolean => {
    return userInventory.includes(themeId);
}