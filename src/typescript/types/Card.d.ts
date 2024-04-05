export interface ICard {
    frontFace?: string;
    backFace?: string;
}
export interface IPlayCard extends ICard {
    icon: string;
    value: string;
}

export interface ICardTheme extends ICard {}

export interface IGameTopic extends Omit<ICard, "backFace">{
}

