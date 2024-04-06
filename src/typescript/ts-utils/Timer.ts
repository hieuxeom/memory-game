export const timeConverter = (totalTime: number) => {
    return {
        second: pad(totalTime % 60),
        minute: pad(Math.floor(totalTime / 60))
    }
}
const pad = (val: number) => {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
};

interface ITimer {
    minuteElement: HTMLElement,
    secondElement: HTMLElement,
    totalTime: number,
    handlerStop: () => void;
}

export class Timer {

    minuteElement: HTMLElement;
    secondElement: HTMLElement;
    totalTime: number;
    timer: any;
    handlerStop: () => void;

    constructor({minuteElement, secondElement, totalTime, handlerStop}: ITimer) {
        this.minuteElement = minuteElement;
        this.secondElement = secondElement;
        this.totalTime = totalTime;
        this.handlerStop = handlerStop

        console.log(this.totalTime)
    }

    start() {
        console.log("start")
        this.timer = setInterval(this.handleTimer.bind(this), 1000);
    }

    stop() {
        this.handlerStop();
        clearInterval(this.timer);
    };

    handleTimer() {

        if (this.totalTime > 0) {
            this.totalTime -= 1;
            const {minute, second} = timeConverter(this.totalTime);
            this.minuteElement.innerHTML = minute;
            this.secondElement.innerHTML = second;
            this.secondElement.dataset.time = this.totalTime.toString();
        } else {
            this.stop();
        }
    }

    getCurrentTime(): number {
        return this.totalTime;
    }

}
