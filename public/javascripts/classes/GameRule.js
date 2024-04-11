import { generateGuestId, getCurrentCardTheme, getCurrentGameMode, getCurrentGameSize, getCurrentGameTime, getCurrentGameTopic, getLocalGuestId, getUserId, setLocalGuestId, } from "../ts-utils/General.js";
import { mapData } from "../game/play-board/game.mapping-data.js";
import { calculateScore } from "../game/play-board/game.score-calculator.js";
export class GameRule {
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
    _id;
    countOpenCards = 0;
    compareValue = [];
    countMatchedCards = 0;
    turnClick = 1;
    wrongCount = 0;
    constructor() {
        this.gameTopicId = getCurrentGameTopic();
        this.cardThemeId = getCurrentCardTheme();
        this.gameSize = getCurrentGameSize();
        this.gameSizeNumber = this.gameSize === "4x4" ? 16 : 20;
        this.gameTime = getCurrentGameTime();
        this.gameMode = getCurrentGameMode();
        this.gameData = mapData(this.gameTopicId, this.cardThemeId, this.gameSize === "4x4");
        this.gameContainer = document.getElementById("gameContainer");
        this._id = getUserId();
        if (!this._id) {
            if (localStorage.getItem("guestId")) {
                this._id = getLocalGuestId();
            }
            else {
                this._id = generateGuestId();
                setLocalGuestId(this._id);
            }
        }
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
    isMatch([v1, v2]) {
        return v1.getAttribute("data-value") === v2.getAttribute("data-value");
    }
    isOnTime() {
        const timer = document.getElementById("secondValue");
        return Number(timer.getAttribute("data-time")) > 0;
    }
    setScore(newScore) {
        const scoreValue = document.getElementById("score");
        this.gameScore = newScore;
        scoreValue.dataset.score = newScore.toString();
        return (scoreValue.innerHTML = newScore.toString());
    }
    hideCard(card) {
        this.countOpenCards--;
        card.classList.remove("open");
        card.classList.remove("open-effect");
        card.classList.add("close-effect");
        return;
    }
    openCard(card) {
        this.countOpenCards++;
        card.classList.remove("close-effect");
        card.classList.add("open");
        card.classList.add("open-effect");
        this.compareValue.push(card);
        return;
    }
    resetCheckRule() {
        this.turnClick = 1;
        this.compareValue = [];
        this.countOpenCards = 0;
        return;
    }
    updateCountMatchedCard() {
        return (this.countMatchedCards = document.querySelectorAll(".card.matched").length);
    }
    mapGameLogic() {
        const listOfCards = document.querySelectorAll(".card");
        listOfCards.forEach((card) => {
            card.addEventListener("click", () => {
                if (this.countOpenCards < 2) {
                    if (!card.className.includes("open")) {
                        this.openCard(card);
                        if (this.countOpenCards === 2) {
                            this.totalTurn++;
                            if (this.isMatch(this.compareValue)) {
                                let tempCompare = this.compareValue;
                                setTimeout(() => {
                                    tempCompare.forEach((e) => {
                                        e.style.visibility = "hidden";
                                        e.classList.add("matched");
                                    });
                                    this.updateCountMatchedCard();
                                    if (this.countMatchedCards % this.gameSizeNumber === 0 && this.isOnTime()) {
                                        setTimeout(() => this.render(), 250);
                                    }
                                    console.log("🚀 ~ GameRule ~ card.addEventListener ~ countMatchedCards:", this.countMatchedCards);
                                }, 500);
                                this.setScore(this.gameScore + calculateScore(this.turnClick));
                                this.resetCheckRule();
                            }
                            else {
                                setTimeout(() => {
                                    this.wrongCount++;
                                    this.turnClick += 1;
                                    this.handleHideCard(listOfCards);
                                    if (this.wrongCount % 3 === 0) {
                                        this.render(Array.from(listOfCards, (_e) => _e.outerHTML));
                                    }
                                }, 500);
                            }
                        }
                    }
                    else {
                        this.compareValue = [];
                        this.hideCard(card);
                    }
                }
            });
        });
    }
    async render(gameData) {
        if (!gameData) {
            gameData = await this.gameData;
        }
        if (this.gameContainer) {
            this.gameContainer.innerHTML = this.shuffleAndSlice(gameData, this.gameSizeNumber).join("");
            this.mapGameLogic();
        }
    }
}
export class NormalGameRule extends GameRule {
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
    showResultBoard = (gameScore, totalCoins, scoreCoin, gameSizeBonus, gameTimeBonus, isHaveHighestScore = false, isWin = true) => {
        const scoreValue = document.getElementById("gameScore");
        const playerHighestScore = document.getElementById("playerHighestScore");
        const totalCoinsValue = document.getElementById("totalCoins");
        const scoreCoinsValue = document.getElementById("scoreCoins");
        const gameSizeBonusValue = document.getElementById("gameSizeBonus");
        const gameTimeBonusValue = document.getElementById("gameTimeBonus");
        const backgroundBoard = document.getElementById("backgroundBoard");
        const notificationBoard = document.getElementById("notification");
        if (isWin) {
            backgroundBoard.src = "/images/win_noti_2.png";
        }
        else {
            backgroundBoard.src = "/images/lose_noti_2.png";
        }
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
        const _id = this._id;
        const { scoreCoin, gameTimeBonus, gameSizeBonus, totalCoins } = this.calculateRewardCoins();
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
export class ChallengeGameRule extends GameRule {
    showResultBoard(requiredScore, playerScore, isWin, rewardCoins) {
        const backgroundBoard = document.getElementById("backgroundBoard");
        if (isWin) {
            backgroundBoard.src = "/images/win_noti_2.png";
        }
        else {
            backgroundBoard.src = "/images/lose_noti_2.png";
        }
        const resultBoard = document.getElementById("notificationChallenge");
        resultBoard.style.display = "block";
        resultBoard.style.display = "flex";
        const requireScoreValue = document.getElementById("requiredScore");
        const playerScoreValue = document.getElementById("playerScore");
        const rewardCoinsValue = document.getElementById("rewardCoins");
        requireScoreValue.innerHTML = `${requiredScore}`;
        playerScoreValue.innerHTML = `${playerScore}`;
        rewardCoinsValue.innerHTML = `${rewardCoins}`;
    }
    getScoreWin(gameSize, gameTime) {
        switch (gameTime) {
            case "60":
                if (gameSize === "4x4") {
                    return 1500;
                }
                else {
                    return 2000;
                }
            case "120":
                if (gameSize === "4x4") {
                    return 3250;
                }
                else {
                    return 3500;
                }
            case "300":
                if (gameSize === "4x4") {
                    return 7500;
                }
                else {
                    return 8000;
                }
        }
        return 0;
    }
    handleWinGame() {
        const confettiContainer = document.getElementById("confetti");
        confettiContainer.style.display = "block";
        let isWin = false;
        if (this.gameScore >= this.getScoreWin(this.gameSize, this.gameTime)) {
            isWin = true;
        }
        const historyData = {
            userId: this._id,
            gameThemeId: this.gameTopicId,
            cardThemeId: this.cardThemeId,
            gameTime: this.gameTime,
            gameSize: this.gameSize,
            gameScore: this.gameScore,
            gameTurn: this.totalTurn,
            totalCoins: isWin ? 5000 : 0,
            gameMode: this.gameMode,
            isWin,
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
        if (this._id) {
            this.showResultBoard(this.getScoreWin(this.gameSize, this.gameTime), this.gameScore, isWin, isWin ? 5000 : 0);
        }
        else {
            this.showResultBoard(this.getScoreWin(this.gameSize, this.gameTime), this.gameScore, isWin, 0);
        }
    }
}
export class HardCoreGameRule extends NormalGameRule {
    timer;
    constructor(timer) {
        super();
        this.timer = timer;
    }
    decreaseWrongChance() {
        const wrongChance = document.getElementById("wrongChance");
        if (wrongChance) {
            return (wrongChance.innerHTML = `${3 - this.wrongCount}`);
        }
    }
    increaseWrongChance() {
        if (this.wrongCount > -3) {
            this.wrongCount -= 1;
        }
        const wrongChance = document.getElementById("wrongChance");
        if (wrongChance) {
            return (wrongChance.innerHTML = `${3 - this.wrongCount}`);
        }
    }
    mapGameLogic() {
        const listOfCards = document.querySelectorAll(".card");
        listOfCards.forEach((card) => {
            card.addEventListener("click", () => {
                if (this.countOpenCards < 2) {
                    if (!card.className.includes("open")) {
                        this.openCard(card);
                        if (this.countOpenCards === 2) {
                            this.totalTurn++;
                            if (this.isMatch(this.compareValue)) {
                                let tempCompare = this.compareValue;
                                this.increaseWrongChance();
                                setTimeout(() => {
                                    tempCompare.forEach((e) => {
                                        e.style.visibility = "hidden";
                                        e.classList.add("matched");
                                    });
                                    this.updateCountMatchedCard();
                                    if (this.countMatchedCards % this.gameSizeNumber === 0 && this.isOnTime()) {
                                        setTimeout(() => this.render(), 250);
                                    }
                                }, 500);
                                this.setScore(this.gameScore + calculateScore(this.turnClick));
                                this.resetCheckRule();
                            }
                            else {
                                setTimeout(() => {
                                    this.wrongCount++;
                                    this.turnClick += 1;
                                    this.handleHideCard(listOfCards);
                                    this.decreaseWrongChance();
                                    if (this.wrongCount > 0 && this.wrongCount % 3 === 0) {
                                        this.timer.stop(false);
                                        this.handleLoseGame();
                                    }
                                }, 500);
                            }
                        }
                    }
                    else {
                        this.compareValue = [];
                        this.hideCard(card);
                    }
                }
            });
        });
    }
    handleLoseGame() {
        const _id = this._id;
        const { scoreCoin, gameTimeBonus, gameSizeBonus, totalCoins } = this.calculateRewardCoins();
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
            isWin: false,
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
            this.showResultBoard(this.gameScore, totalCoins, scoreCoin, gameSizeBonus, gameTimeBonus, false, false);
        }
        else {
            this.showResultBoard(this.gameScore);
        }
    }
    handleWinGame() {
        const _id = this._id;
        const { scoreCoin, gameTimeBonus, gameSizeBonus, totalCoins } = this.calculateRewardCoins();
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
            isWin: true,
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
