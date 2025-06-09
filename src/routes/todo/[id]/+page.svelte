<script lang="ts">
import { PomodoroTimer, PomodoroTimerPhase, PomodoroTimerState } from '$lib/client/pomodoro';
import { plusPomodoro } from '$lib/client/todos';
import { onDestroy, onMount } from 'svelte';
import { beforeNavigate } from '$app/navigation';
const { data } = $props();
const { todo } = data;

function formatTime(timeLeft: number) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const timer = new PomodoroTimer(todo.timer?.study_time ?? 25, todo.timer?.break_time ?? 5);
let clock_str = $state(formatTime(timer.getWorkTime()));
let spend_time = $state(0);
let pomoState: PomodoroTimerState = $state(timer.getState());
let pomo_state_title = $state("작업 시간");

onMount(() => {
    beforeNavigate(({ cancel }) => {
        if (timer.getState() === PomodoroTimerState.RUNNING) {
            const response = confirm("타이머가 실행중입니다. 진행중인 상태가 삭제될 수 있습니다. 정말로 종료하시겠습니까?");
            if (!response) {
                cancel();
            }
        }
    });
});

timer.onTick = ((timeLeft) => {
    clock_str = formatTime(timeLeft);
    spend_time++;
});

timer.onCompleteWork = () => {
    plusPomodoro(todo.id, 1, timer.getWorkTime(), timer.getBreakTime())
    .then((result) => {
        if(result) {
            todo.pomodoro++;
        }
    });
    let isSkip = confirm("포모도로 완료! 휴식 시간을 건너뛰시겠습니까?");
    if (!isSkip) {
        timer.setPhase(PomodoroTimerPhase.BREAKING);
        pomo_state_title = "휴식 시간";
    }
};

timer.onCompleteBreak = () => {
    timer.setPhase(PomodoroTimerPhase.WORKING);
    pomo_state_title = "작업 시간";
};

timer.onStateChanged = ((state) => {
    clock_str = formatTime(timer.getTimeLeft());
    pomoState = state;
    if (state === PomodoroTimerState.STOPPED) {
        spend_time = 0;
    }
});

onDestroy(() => {
    if (timer.getState() === PomodoroTimerState.RUNNING) {
        timer.pause();
    }
});

</script>

<svelte:head>
    <title>{todo.content} - 포모도로 타이머</title>
    <meta name="description" content="{todo.description || '포모도로 타이머로 집중해서 작업하세요'}">
</svelte:head>

<div class="todo-info-section">
    <div class="todo-title">{todo.content}</div>
    <div class="todo-description">{todo.description}</div>
    <div class="todo-detail">최소 목표 포모도로: <span class="todo-detail-value">{todo.min_pomodoro}</span></div>
    <div class="todo-detail">완료한 포모도로: <span class="todo-detail-value">{todo.pomodoro}</span></div>
    {#if todo.timer}
        <div class="todo-detail">공부 시간 설정: <span class="todo-detail-value">{todo.timer.study_time}분</span></div>
        <div class="todo-detail">휴식 시간 설정: <span class="todo-detail-value">{todo.timer.break_time}분</span></div>
    {/if}
</div>

<div class="timer-container">

    <div class="timer-section">
        <div class="timer-state-title">{pomo_state_title}</div>
        <div class="timer-grid">
            <div class="timer-item">
                <div class="timer-label">current time</div>
                <div class="timer-display">
                    <span class="timer-text">
                        {clock_str}
                    </span>
                </div>
            </div>
            <div class="timer-item">
                <div class="timer-label">spend time</div>
                <div class="timer-display">
                    <span class="timer-text">
                        {formatTime(spend_time)}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div class="button-container">
        {#if pomoState === PomodoroTimerState.STOPPED}
            <button onclick={() => timer.start()} class="timer-button">
                PLAY
            </button>
        {:else if pomoState === PomodoroTimerState.RUNNING}
            <button onclick={() => timer.pause()} class="timer-button">
                PAUSE
            </button>
        {:else if pomoState === PomodoroTimerState.PAUSED}
            <button onclick={() => timer.resume()} class="timer-button">
                RESUME
            </button>
            <button onclick={() => timer.reset()} class="timer-button">
                RESET
            </button>
        {/if}
    </div>
</div>

<style lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');
    @reference "tailwindcss";
    @plugin "daisyui";

    .timer-display {
        @apply text-3xl sm:text-5xl text-primary tracking-widest select-none;
        font-family: 'Orbitron', monospace;
        letter-spacing: 0.1em;
    }

    .todo-info-section {
        @apply m-2 pt-6 pl-6;
    }

    .todo-title {
        @apply text-primary font-bold text-4xl mb-3;
    }

    .todo-description {
        @apply text-lg text-base-content/70 mb-4;
    }

    .todo-detail {
        @apply text-base text-base-content/50 mb-1;
    }

    .timer-state-title {
        @apply text-primary font-bold text-2xl text-center mb-4;
    }

    .todo-detail:last-child {
        @apply mb-4;
    }

    .todo-detail-value {
        @apply font-semibold;
    }

    .timer-container {
        @apply max-w-[80vw] w-full sm:w-[600px] p-10 sm:p-14 mx-auto  relative;
    }

    .timer-section {
        @apply flex flex-col items-center bg-base-200 rounded-2xl p-4 mb-4;
    }

    .timer-grid {
        @apply grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10;
    }

    .timer-item {
        @apply flex flex-col items-center bg-base-300 rounded-2xl p-4;
    }

    .timer-label {
        @apply text-accent text-sm mb-1 ml-1;
    }

    .timer-text {
        font-family: 'Orbitron', monospace;
        letter-spacing: 0.1em;
   }

    .button-container {
        @apply flex flex-row justify-center items-center gap-4;
    }

    .timer-button {
        @apply w-full border-2 border-primary rounded-lg py-5 text-2xl text-primary font-bold hover:bg-primary hover:text-base-100 transition mt-4;
    }

    .main-section {
        @apply flex justify-center items-center min-h-screen bg-base-200;
    }
</style>
