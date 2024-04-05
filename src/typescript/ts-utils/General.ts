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
export const getUserId = (): string | undefined => {
    if (getUserData()) {
        return getUserData()?._id || undefined;
    }
}