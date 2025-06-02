import type { Pomodoro } from "$lib/server/db/schema";

export enum PomodoroTimerPhase {
    WORKING = 'WORKING',
    BREAKING = 'BREAKING',
}

export enum PomodoroTimerState {
    STOPPED = 'STOPPED',
    RUNNING = 'RUNNING',
    PAUSED = 'PAUSED',
}


export class PomodoroTimer {
    private workTime: number;
    private breakTime: number;
    private isRunning: boolean = false;
    private timerInterval: NodeJS.Timeout | null = null;
    private timeLeft: number;
    private state: PomodoroTimerState = PomodoroTimerState.STOPPED;
    private phase: PomodoroTimerPhase = PomodoroTimerPhase.WORKING;

    public onTick: (timeLeft: number) => void = () => {};
    public onComplete: (phase: PomodoroTimerPhase) => void = () => {};
    public onError: (error: string) => void = () => {};
    public onStateChanged: (state: PomodoroTimerState) => void = () => {};

    constructor(workTime: number, breakTime: number) {
        this.workTime = workTime * 60;
        this.breakTime = breakTime * 60;
        this.timeLeft = this.workTime;
    }

    private finish() {
        this.onComplete(this.phase);
        this.state = PomodoroTimerState.STOPPED;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.timerInterval = null;
        if (this.phase === PomodoroTimerPhase.WORKING) {
            this.timeLeft = this.workTime;
            this.phase = PomodoroTimerPhase.WORKING;
        } else {
            this.timeLeft = this.breakTime;
            this.phase = PomodoroTimerPhase.BREAKING;
        }
        
        this.onStateChanged(this.state);
    }

    public start() {
        if (this.state !== PomodoroTimerState.STOPPED) {
            this.onError("Timer is already running");
            return;
        }
        this.state = PomodoroTimerState.RUNNING;
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.onTick(this.timeLeft);
            if (this.timeLeft <= 0) {
                this.finish();
            }
        }, 1000);

        this.onStateChanged(this.state);
    }

    public reset() {
        if (this.state !== PomodoroTimerState.PAUSED) {
            this.onError("Timer is not paused");
            return;
        }
        this.state = PomodoroTimerState.STOPPED;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        if (this.phase === PomodoroTimerPhase.WORKING) {
            this.timeLeft = this.workTime;
        } else {
            this.timeLeft = this.breakTime;
        }

        this.onStateChanged(this.state);
    }

    public skip() {
        if (this.state !== PomodoroTimerState.RUNNING && this.state !== PomodoroTimerState.PAUSED) {
            this.onError("Timer is not running or paused");
            return;
        }
        this.state = PomodoroTimerState.STOPPED;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.timerInterval = null;
        if (this.phase === PomodoroTimerPhase.WORKING) {
            this.timeLeft = this.workTime;
        } else {
            this.timeLeft = this.breakTime;
        }

        this.onStateChanged(this.state);
    }

    public pause() {
        if (this.state !== PomodoroTimerState.RUNNING) {
            this.onError("Timer is not running");
            return;
        }
        this.state = PomodoroTimerState.PAUSED;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.onStateChanged(this.state);
    }
    public resume() {
        if (this.state !== PomodoroTimerState.PAUSED) {
            this.onError("Timer is not paused");
            return;
        }
        this.state = PomodoroTimerState.RUNNING;
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.onTick(this.timeLeft);
            if (this.timeLeft <= 0) {
                this.finish();
            }
        }, 1000);

        this.onStateChanged(this.state);
    }

    public getTimeLeft() {
        return this.timeLeft;
    }

    public getPhase() {
        return this.phase;
    }

    public getState() {
        return this.state;
    }

    public getWorkTime() {
        return this.workTime;
    }

    public getBreakTime() {
        return this.breakTime;
    }
}