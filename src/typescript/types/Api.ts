export enum FetchStatus {
    SUCCESS = "success",
    FAILURE = "failure",
    ERROR = "error",
    REDIRECT = "redirect"
}

export type ResponseStatus = "success" | "failure" | "error" | "redirect"

export type ErrorDetails = {
    name: string,
    message: string
}

export type GameTopicData = {
    icon: string,
    value: string,
}
export interface IApiResponse {
    status: ResponseStatus,
    message: string,
    data?: any;
    url?: string;
    error?: ErrorDetails;
}

export interface ICardTheme {
    _id: string;
    themeName: string;
    cardBack: string;
    cardFront: string;
    price: number;
    used: number;
    isVip: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface IGameTopic {
    _id: string;
    themeName: string;
    themeData: GameTopicData[];
    rawData: string;
    themeThumbnail: string;
    type: string;
    isVip: boolean;
    price: number;
    isDeleted: boolean;
    played: number;
    createAt: string;
    updatedAt: string;
}