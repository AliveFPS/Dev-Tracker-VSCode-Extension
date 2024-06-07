export class Timer {
    private startTime: Date | null;
    private endTime: Date | null;
    private timerInterval: NodeJS.Timeout | null;
  
    constructor() {
      this.startTime = null;
      this.endTime = null;
      this.timerInterval = null;
    }
  
    start(): void {
        this.startTime = new Date();
        this.timerInterval = setInterval(() => {
          const elapsedTime = this.getElapsedTimeInSeconds();
          process.stdout.write(`\rElapsed time: ${elapsedTime} seconds`);
        }, 1000);
      }
  
    stop(): void {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this.endTime = new Date();
    }
  
    getElapsedTimeInSeconds(): number {
      if (!this.startTime) {
        throw new Error('Timer has not been started');
      }
  
      const currentTime = this.endTime || new Date();
      return Math.floor((currentTime.getTime() - this.startTime.getTime()) / 1000);
    }
  }



function testTimer() {
    console.log('Starting timer test...');

    const timer = new Timer();
    timer.start();

}

testTimer()