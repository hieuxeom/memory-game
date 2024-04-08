import { generateGuestId, getCurrentCardTheme, getCurrentGameMode, getCurrentGameSize, getCurrentGameTime, getCurrentGameTopic, getLocalGuestId, getUserId, setLocalGuestId } from "../../ts-utils/General.js";
import { mapData } from "./game.mapping-data.js";
import { calculateScore } from "./game.score-calculator.js";
export class GameBoard {
    gameTopicId;
    cardThemeId;
    gameSize;
    gameSizeNumber;
    gameTime;
    gameMode;
    gameScore = 0;
    totalTurn = 0;
    gameData;
    gameContainer;
    countOpenCards = 0;
    compareValue = [];
    countMatchedCards = 0;
    turnClick = 1;
    constructor() {
        this.gameTopicId = getCurrentGameTopic();
        this.cardThemeId = getCurrentCardTheme();
        this.gameSize = getCurrentGameSize();
        this.gameSizeNumber = this.gameSize === "4x4" ? 16 : 20;
        this.gameTime = getCurrentGameTime();
        this.gameMode = getCurrentGameMode();
        this.gameData = mapData(this.gameTopicId, this.cardThemeId, this.gameSize === "4x4");
        this.gameContainer = document.getElementById("gameContainer");
    }
    shuffleAndSlice(array, length, next = true) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        if (next) {
            array.length = length / 2;
            // return this.shuffleAndSlice([...array, ...array], length, false);
            return [...array, ...array];
        }
        else {
            return [...array];
        }
    }
    handleHideCard(listCard) {
        this.countOpenCards = 0;
        this.compareValue = [];
        return listCard.forEach((card) => {
            if (!card.className.includes("matched") && card.className.includes("open")) {
                card.classList.remove("open");
                card.classList.remove("open-effect");
                card.classList.add("close-effect");
            }
        });
    }
    ;
    isMatch([v1, v2]) {
        return v1.getAttribute("data-value") === v2.getAttribute("data-value");
    }
    ;
    isOnTime() {
        const timer = document.getElementById("secondValue");
        return Number(timer.getAttribute("data-time")) > 0;
    }
    setScore(newScore) {
        const scoreValue = document.getElementById("score");
        this.gameScore = newScore;
        scoreValue.dataset.score = newScore.toString();
        return scoreValue.innerHTML = newScore.toString();
    }
    mapGameLogic() {
        const listOfCards = document.querySelectorAll(".card");
        listOfCards.forEach((card) => {
            card.addEventListener("click", () => {
                if (this.countOpenCards < 2) {
                    if (!card.className.includes("open")) {
                        this.countOpenCards++;
                        card.classList.remove("close-effect");
                        card.classList.add("open");
                        card.classList.add("open-effect");
                        this.compareValue.push(card);
                        if (this.countOpenCards === 2) {
                            this.totalTurn++;
                            // this.setTotalTurn(totalTurn);
                            if (this.isMatch(this.compareValue)) {
                                let tempCompare = this.compareValue;
                                this.countMatchedCards += 2;
                                setTimeout(() => {
                                    tempCompare.forEach((e) => {
                                        e.style.visibility = 'hidden';
                                        e.classList.add("matched");
                                    });
                                }, 500);
                                this.setScore(this.gameScore + calculateScore(this.turnClick));
                                this.turnClick = 1;
                                this.compareValue = [];
                                this.countOpenCards = 0;
                                if (this.countMatchedCards % this.gameSizeNumber === 0 && this.isOnTime()) {
                                    setTimeout(() => this.render(), 250);
                                }
                            }
                            else {
                                setTimeout(() => {
                                    this.turnClick += 1;
                                    this.handleHideCard(listOfCards);
                                }, 500);
                            }
                        }
                    }
                    else {
                        this.countOpenCards--;
                        this.compareValue = [];
                        card.classList.remove("open");
                        card.classList.remove("open-effect");
                        card.classList.add("close-effect");
                    }
                }
            });
        });
    }
    async render() {
        if (this.gameContainer) {
            this.gameContainer.innerHTML = this.shuffleAndSlice(await this.gameData, this.gameSizeNumber).join("");
            this.mapGameLogic();
        }
    }
}
export class NormalGameRule extends GameBoard {
    calculateRewardCoins() {
        let scoreCoin = (this.gameScore * 10) / 100;
        let gameSizeBonus = 0;
        let gameTimeBonus = 0;
        switch (this.gameSizeNumber) {
            case 16:
                if (this.gameScore > 10000) {
                    gameSizeBonus = 200;
                }
                else if (this.gameScore > 5000) {
                    gameSizeBonus = 100;
                }
                break;
            case 20:
                if (this.gameScore > 10000) {
                    gameSizeBonus = 400;
                }
                else if (this.gameScore > 5000) {
                    gameSizeBonus = 200;
                }
                break;
        }
        switch (this.gameTime) {
            case "60":
                if (this.gameScore > 10000) {
                    gameTimeBonus = 500;
                }
                else if (this.gameScore > 5000) {
                    gameTimeBonus = 250;
                }
                break;
            case "120":
                if (this.gameScore > 15000) {
                    gameTimeBonus = 500;
                }
                else if (this.gameScore > 10000) {
                    gameTimeBonus = 250;
                }
                break;
            case "300":
                if (this.gameScore > 20000) {
                    gameTimeBonus = 500;
                }
                else if (this.gameScore > 15000) {
                    gameTimeBonus = 250;
                }
                break;
            default:
                break;
        }
        return {
            scoreCoin,
            gameTimeBonus,
            gameSizeBonus,
            totalCoins: scoreCoin + gameTimeBonus + gameSizeBonus,
        };
    }
    showResultBoard = (gameScore, totalCoins, scoreCoin, gameSizeBonus, gameTimeBonus, isHaveHighestScore = false) => {
        const scoreValue = document.getElementById("gameScore");
        const playerHighestScore = document.getElementById("playerHighestScore");
        const totalCoinsValue = document.getElementById("totalCoins");
        const scoreCoinsValue = document.getElementById("scoreCoins");
        const gameSizeBonusValue = document.getElementById("gameSizeBonus");
        const gameTimeBonusValue = document.getElementById("gameTimeBonus");
        const notificationBoard = document.getElementById("notification");
        notificationBoard.style.display = "block";
        notificationBoard.style.display = "flex";
        scoreValue.innerHTML = gameScore.toString();
        totalCoinsValue.innerHTML = `${totalCoins}`;
        scoreCoinsValue.innerHTML = `${scoreCoin}`;
        gameSizeBonusValue.innerHTML = `${gameSizeBonus}`;
        gameTimeBonusValue.innerHTML = `${gameTimeBonus}`;
        if (!isHaveHighestScore) {
            playerHighestScore.style.display = "none";
            playerHighestScore.previousElementSibling && (playerHighestScore.previousElementSibling.style.display = "none");
        }
    };
    handleWinGame() {
        let _id = getUserId();
        const { scoreCoin, gameTimeBonus, gameSizeBonus, totalCoins } = this.calculateRewardCoins();
        if (!_id) {
            if (localStorage.getItem("guestId")) {
                _id = getLocalGuestId();
            }
            else {
                _id = generateGuestId();
                setLocalGuestId(_id);
            }
        }
        const confettiContainer = document.getElementById("confetti");
        confettiContainer.style.display = "block";
        const historyData = {
            userId: _id,
            gameThemeId: this.gameTopicId,
            cardThemeId: this.cardThemeId,
            gameTime: this.gameTime,
            gameSize: this.gameSize,
            gameScore: this.gameScore,
            gameTurn: this.totalTurn,
            totalCoins,
            gameMode: this.gameMode,
        };
        fetch("/api/game-results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(historyData),
        })
            .then((res) => res.json())
            .then((res) => {
            if (res.status === "success" && res.data) {
                localStorage.setItem("userData", JSON.stringify(res.data));
            }
        });
        if (_id) {
            this.showResultBoard(this.gameScore, totalCoins, scoreCoin, gameSizeBonus, gameTimeBonus);
        }
        else {
            this.showResultBoard(this.gameScore);
        }
    }
}
