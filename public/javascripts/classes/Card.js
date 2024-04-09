export class Card {
    frontFace;
    backFace;
    constructor(frontFace, backFace) {
        this.frontFace = frontFace ?? "";
        this.backFace = backFace ?? "";
    }
    onSelect(handler) {
        return handler;
    }
    render() {
        return `<div class="crd relative shadow-lg h-[170px] rounded-lg overflow-hidden">
                    <div class="card-back h-full">
                        <img src="/images/themepacks/${this.backFace}" class="w-full h-full" alt="cardBack"/>
                    </div>
                    <div class="card-front w-full h-full">
                        <div>
                            <img src="/images/themepacks/${this.frontFace}" class="w-full h-full" alt="cardBack"/>
                        </div>
                    </div>
                </div>`;
    }
}
export class PlayCard extends Card {
    icon;
    value;
    isNormal = true;
    constructor({ frontFace, backFace, icon, value }, isNormal) {
        super(frontFace, backFace);
        this.icon = icon;
        this.value = value;
        this.isNormal = isNormal;
    }
    render() {
        return `<div data-value="${this.value}"
                    class="card relative bg-transparent h-[${this.isNormal ? "170" : "135"}px] rounded-lg overflow-hidden"
                >
                    <div class="card-back h-full">
                        <img src="/images/themepacks/${this.backFace}" class="w-full h-full" alt=""/>
                    </div>
                    <div class="bg-transparent card-front w-full h-full">
                        <div class="bg-transparent">
                            <img src="/images/themepacks/${this.frontFace}" class="w-full h-full" alt/>
                        </div>
                        <div class="bg-transparent absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                            <i class="${this.icon} text-4xl"></i>
                        </div>
                    </div>
                </div>`;
    }
}
export class CardThemeCard extends Card {
    _id;
    isSelected = false;
    constructor(_id, backFace, frontFace, isSelected) {
        super(frontFace, backFace);
        this._id = _id;
        this.isSelected = isSelected;
    }
    render() {
        return `<div data-id="${this._id}" class="card-theme relative shadow-lg h-[150px] rounded-lg overflow-hidden ${this.isSelected ? "selected" : ""}">
                    <div class="card-back h-full">
                        <img src="/images/themepacks/${this.backFace}" class="w-full h-full" alt="cardBack"/>
                    </div>
                </div>`;
    }
}
export class GameTopicCard extends Card {
    _id;
    themeName;
    isSelected = false;
    constructor(_id, themeName, backFace, isSelected) {
        super("", backFace);
        this._id = _id;
        this.themeName = themeName;
        this.isSelected = isSelected;
    }
    render() {
        return `<div data-id="${this._id}" class="game-topic relative shadow-lg h-[150px] rounded-lg overflow-hidden ${this.isSelected ? "selected" : ""}">
                    <div class="card-back h-full">
                        <img src="/images/game_thumbnails/${this.backFace}" class="w-full h-full" alt="cardBack"/>
                    </div>
                </div>`;
    }
}
export class ShopCardTheme extends Card {
    _id;
    constructor(_id, backFace) {
        super("", backFace);
        this._id = _id;
    }
    render() {
        return `<div data-id="${this._id}" class="card-theme relative shadow-lg h-[170px] rounded-lg overflow-hidden">
                    <div class="card-back h-full">
                        <img src="/images/themepacks/${this.backFace}" class="w-full h-full" alt="cardBack"/>
                    </div>
                </div>`;
    }
}
export class ShopGameTopic extends Card {
    _id;
    constructor(_id, themeThumbnail) {
        super("", themeThumbnail);
        this._id = _id;
    }
    render() {
        return `<div data-id="${this._id}" class="card-theme relative shadow-lg h-[170px] rounded-lg overflow-hidden">
                    <div class="card-back h-full">
                        <img src="/images/game_thumbnails/${this.backFace}" class="w-full h-full" alt="cardBack"/>
                    </div>
                </div>`;
    }
}
