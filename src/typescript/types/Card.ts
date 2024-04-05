export interface ICard {
    frontFace?: string;
    backFace?: string;
}
export interface IPlayCard extends ICard {
    icon: string;
    value: string;
}

export interface ICardThemeCard extends ICard {}

export interface IGameTopicCard extends Omit<ICard, "backFace">{
}

