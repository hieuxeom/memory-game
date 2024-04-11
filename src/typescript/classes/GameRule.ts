import {
	generateGuestId,
	getCurrentCardTheme,
	getCurrentGameMode,
	getCurrentGameSize,
	getCurrentGameTime,
	getCurrentGameTopic,
	getLocalGuestId,
	getUserId,
	setLocalGuestId,
} from "../ts-utils/General.js";
import { mapData } from "../game/play-board/game.mapping-data.js";
import { calculateScore } from "../game/play-board/game.score-calculator.js";
import { Timer } from "../ts-utils/Timer.js";

export class GameRule {
	gameTopicId: string;
	cardThemeId: string;
	gameSize: string;
	gameSizeNumber: number;
	gameTime: string;
	gameMode: string;
	gameScore: number = 0;
	totalTurn: number = 0;
	gameData: Promise<string[]>;
	gameContainer: HTMLElement | null;
	_id: string | undefined;

	countOpenCards: number = 0;
	compareValue: HTMLElement[] = [];
	countMatchedCards: number = 0;
	turnClick: number = 1;
	wrongCount: number = 0;
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
			} else {
				this._id = generateGuestId();
				setLocalGuestId(this._id);
			}
		}
	}

	shuffleAndSlice(array: string[], length: number, next: boolean = true): string[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		if (next) {
			array.length = length / 2;
			// return this.shuffleAndSlice([...array, ...array], length, false);
			return [...array, ...array];
		} else {
			return [...array];
		}
	}

	handleHideCard(listCard: NodeListOf<HTMLElement>) {
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

	isMatch([v1, v2]: HTMLElement[]): boolean {
		return v1.getAttribute("data-value") === v2.getAttribute("data-value");
	}

	isOnTime(): boolean {
		const timer: HTMLElement = document.getElementById("secondValue") as HTMLElement;
		return Number(timer.getAttribute("data-time")) > 0;
	}

	setScore(newScore: number) {
		const scoreValue: HTMLElement = document.getElementById("score") as HTMLElement;
		this.gameScore = newScore;
		scoreValue.dataset.score = newScore.toString();
		return (scoreValue.innerHTML = newScore.toString());
	}

	hideCard(card: HTMLElement) {
		this.countOpenCards--;
		card.classList.remove("open");
		card.classList.remove("open-effect");
		card.classList.add("close-effect");
		return;
	}

	openCard(card: HTMLElement) {
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
		this.wrongCount = 0;
		return;
	}
	updateCountMatchedCard() {
		return (this.countMatchedCards = document.querySelectorAll(".card.matched").length);
	}
	mapGameLogic() {
		const listOfCards: NodeListOf<HTMLElement> = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
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
							} else {
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
					} else {
						this.compareValue = [];
						this.hideCard(card);
					}
				}
			});
		});
	}

	async render(gameData?: string[]) {
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
				} else if (this.gameScore > 5000) {
					gameSizeBonus = 100;
				}
				break;
			case 20:
				if (this.gameScore > 10000) {
					gameSizeBonus = 400;
				} else if (this.gameScore > 5000) {
					gameSizeBonus = 200;
				}
				break;
		}

		switch (this.gameTime) {
			case "60":
				if (this.gameScore > 10000) {
					gameTimeBonus = 500;
				} else if (this.gameScore > 5000) {
					gameTimeBonus = 250;
				}
				break;
			case "120":
				if (this.gameScore > 15000) {
					gameTimeBonus = 500;
				} else if (this.gameScore > 10000) {
					gameTimeBonus = 250;
				}
				break;
			case "300":
				if (this.gameScore > 20000) {
					gameTimeBonus = 500;
				} else if (this.gameScore > 15000) {
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

	showResultBoard = (
		gameScore: number,
		totalCoins?: number,
		scoreCoin?: number,
		gameSizeBonus?: number,
		gameTimeBonus?: number,
		isHaveHighestScore = false,
		isWin = true
	) => {
		const scoreValue: HTMLElement = document.getElementById("gameScore") as HTMLElement;
		const playerHighestScore: HTMLElement = document.getElementById("playerHighestScore") as HTMLElement;
		const totalCoinsValue: HTMLElement = document.getElementById("totalCoins") as HTMLElement;
		const scoreCoinsValue: HTMLElement = document.getElementById("scoreCoins") as HTMLElement;
		const gameSizeBonusValue: HTMLElement = document.getElementById("gameSizeBonus") as HTMLElement;
		const gameTimeBonusValue: HTMLElement = document.getElementById("gameTimeBonus") as HTMLElement;
		const backgroundBoard: HTMLImageElement = document.getElementById("backgroundBoard") as HTMLImageElement;

		const notificationBoard: HTMLElement = document.getElementById("notification") as HTMLElement;

		if (isWin) {
			backgroundBoard.src = "/images/win_noti_2.png";
		} else {
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
			playerHighestScore.previousElementSibling && ((playerHighestScore.previousElementSibling as HTMLElement).style.display = "none");
		}
	};

	handleWinGame() {
		const _id = this._id;
		const { scoreCoin, gameTimeBonus, gameSizeBonus, totalCoins } = this.calculateRewardCoins();
		const confettiContainer: HTMLCanvasElement = document.getElementById("confetti") as HTMLCanvasElement;
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
		} else {
			this.showResultBoard(this.gameScore);
		}
	}
}

export class ChallengeGameRule extends GameRule {
	showResultBoard(requiredScore: number, playerScore: number, isWin: boolean, rewardCoins?: number) {
		const backgroundBoard: HTMLImageElement = document.getElementById("backgroundBoard") as HTMLImageElement;

		if (isWin) {
			backgroundBoard.src = "/images/win_noti_2.png";
		} else {
			backgroundBoard.src = "/images/lose_noti_2.png";
		}

		const resultBoard: HTMLElement = document.getElementById("notificationChallenge") as HTMLElement;
		resultBoard.style.display = "block";
		resultBoard.style.display = "flex";

		const requireScoreValue: HTMLElement = document.getElementById("requiredScore") as HTMLElement;
		const playerScoreValue: HTMLElement = document.getElementById("playerScore") as HTMLElement;
		const rewardCoinsValue: HTMLElement = document.getElementById("rewardCoins") as HTMLElement;

		requireScoreValue.innerHTML = `${requiredScore}`;
		playerScoreValue.innerHTML = `${playerScore}`;
		rewardCoinsValue.innerHTML = `${rewardCoins}`;
	}

	getScoreWin(gameSize: string, gameTime: string): number {
		switch (gameTime) {
			case "60":
				if (gameSize === "4x4") {
					return 1500;
				} else {
					return 2000;
				}

			case "120":
				if (gameSize === "4x4") {
					return 3250;
				} else {
					return 3500;
				}
			case "300":
				if (gameSize === "4x4") {
					return 7500;
				} else {
					return 8000;
				}
		}
		return 0;
	}

	handleWinGame() {
		const confettiContainer: HTMLCanvasElement = document.getElementById("confetti") as HTMLCanvasElement;
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
		} else {
			this.showResultBoard(this.getScoreWin(this.gameSize, this.gameTime), this.gameScore, isWin, 0);
		}
	}
}

export class HardCoreGameRule extends NormalGameRule {
	timer: Timer;
	constructor(timer: Timer) {
		super();

		this.timer = timer;
	}

	decreaseWrongChance() {
		const wrongChance: HTMLElement = document.getElementById("wrongChance") as HTMLElement;

		if (wrongChance) {
			return (wrongChance.innerHTML = `${3 - this.wrongCount}`);
		}
	}

	mapGameLogic() {
		const listOfCards: NodeListOf<HTMLElement> = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
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
								}, 500);

								this.setScore(this.gameScore + calculateScore(this.turnClick));
								this.resetCheckRule();
							} else {
								setTimeout(() => {
									this.wrongCount++;
									this.turnClick += 1;
									this.handleHideCard(listOfCards);
									this.decreaseWrongChance();
									if (this.wrongCount % 3 === 0) {
										this.timer.stop(false);
										this.handleLoseGame();
									}
								}, 500);
							}
						}
					} else {
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
		const confettiContainer: HTMLCanvasElement = document.getElementById("confetti") as HTMLCanvasElement;
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
		} else {
			this.showResultBoard(this.gameScore);
		}
	}

	handleWinGame() {
		const _id = this._id;
		const { scoreCoin, gameTimeBonus, gameSizeBonus, totalCoins } = this.calculateRewardCoins();
		const confettiContainer: HTMLCanvasElement = document.getElementById("confetti") as HTMLCanvasElement;
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
		} else {
			this.showResultBoard(this.gameScore);
		}
	}
}
