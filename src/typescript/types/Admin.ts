import {ICardTheme} from "./Api.js";

export type ICardThemeRow =  Pick<ICardTheme, "_id" | "themeName" |"isVip" |"isDeleted">