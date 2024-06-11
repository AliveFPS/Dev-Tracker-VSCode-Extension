"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
class Timer {
    startTime;
    endTime;
    timerInterval;
    constructor() {
        this.startTime = null;
        this.endTime = null;
        this.timerInterval = null;
    }
    start() {
        this.startTime = new Date();
        this.timerInterval = setInterval(() => {
            const elapsedTime = this.getElapsedTimeInSeconds();
            console.log(`\rElapsed time: ${elapsedTime} seconds`);
        }, 1000);
    }
    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.endTime = new Date();
    }
    getElapsedTimeInSeconds() {
        if (!this.startTime) {
            throw new Error('Timer has not been started');
        }
        const currentTime = this.endTime || new Date();
        return Math.floor((currentTime.getTime() - this.startTime.getTime()) / 1000);
    }
}
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map