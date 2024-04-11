import { ChallengeGameRule, HardCoreGameRule, NormalGameRule } from "../../classes/GameRule.js";
import { Timer } from "../../ts-utils/Timer.js";
import { getCurrentGameMode, getCurrentGameTime } from "../../ts-utils/General.js";

const totalTime = Number(getCurrentGameTime());
// const totalTime = ;
const minuteElement: HTMLElement = document.getElementById("minuteValue") as HTMLElement;
const secondElement: HTMLElement = document.getElementById("secondValue") as HTMLElement;

const MapGameRule: Record<string, any> = {
	normal: NormalGameRule,
	challenge: ChallengeGameRule,
	hardcore: HardCoreGameRule,
};

const handlerStop = () => {
	let listCards = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
	listCards.forEach((card) => card.classList.add("disabled"));
	gameRule.handleWinGame();
};

const timer = new Timer({
	minuteElement,
	secondElement,
	totalTime,
	handlerStop,
});

timer.start();

const gameRule = new MapGameRule[getCurrentGameMode()](timer);
gameRule.render();
