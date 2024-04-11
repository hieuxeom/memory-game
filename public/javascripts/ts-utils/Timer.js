export const timeConverter = (totalTime) => {
    return {
        second: pad(totalTime % 60),
        minute: pad(Math.floor(totalTime / 60)),
    };
};
const pad = (val) => {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
};
export class Timer {
    minuteElement;
    secondElement;
    totalTime;
    timer;
    handlerStop;
    constructor({ minuteElement, secondElement, totalTime, handlerStop }) {
        this.minuteElement = minuteElement;
        this.secondElement = secondElement;
        this.totalTime = totalTime;
        this.handlerStop = handlerStop;
        console.log(this.totalTime);
    }
    start() {
        console.log("start");
        this.timer = setInterval(this.handleTimer.bind(this), 1000);
    }
    stop(isExecuteHandler = true) {
        if (isExecuteHandler) {
            this.handlerStop();
        }
        clearInterval(this.timer);
    }
    handleTimer() {
        if (this.totalTime > 0) {
            this.totalTime -= 1;
            const { minute, second } = timeConverter(this.totalTime);
            this.minuteElement.innerHTML = minute;
            this.secondElement.innerHTML = second;
            this.secondElement.dataset.time = this.totalTime.toString();
        }
        else {
            this.stop();
        }
    }
    getCurrentTime() {
        return this.totalTime;
    }
}
