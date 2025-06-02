<script lang="ts">
import { PomodoroTimer, PomodoroTimerPhase, PomodoroTimerState } from '$lib/client/pomodoro';
import { plusPomodoro } from '$lib/client/todos';
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

timer.onTick = ((timeLeft) => {
    clock_str = formatTime(timeLeft);
    spend_time++;
});

timer.onComplete = async (phase) => {
    console.log(phase);
    if (phase === PomodoroTimerPhase.WORKING) {
        plusPomodoro(todo.id, 1, timer.getWorkTime(), timer.getBreakTime())
        .then((result) => {
            if(result) {
                todo.pomodoro++;
            }
        });
    } 
};     

timer.onStateChanged = ((state) => {
    clock_str = formatTime(timer.getTimeLeft());
    pomoState = state;
    if (state === PomodoroTimerState.STOPPED) {
        spend_time = 0;
    }
});

</script>

    <div class="m-2 pt-6 pl-6">
        <div class="text-primary font-bold text-4xl mb-3">{todo.content}</div>
        <div class="text-lg text-base-content/70 mb-4">{todo.description}</div>
        <div class="text-base text-base-content/50 mb-1">최소 목표 포모도로: <span class="font-semibold">{todo.min_pomodoro}</span></div>
        <div class="text-base text-base-content/50 mb-1">완료한 포모도로: <span class="font-semibold">{todo.pomodoro}</span></div>
        {#if todo.timer}
            <div class="text-base text-base-content/50 mb-1">공부 시간: <span class="font-semibold">{todo.timer.study_time}분</span></div>
            <div class="text-base text-base-content/50 mb-4">휴식 시간: <span class="font-semibold">{todo.timer.break_time}분</span></div>
        {/if}
    </div>

    <div class="max-w-[80vw] w-full sm:w-[600px] bg-base-100 rounded-2xl p-10 sm:p-14 mx-auto shadow-2xl relative">
        <!-- 상단 정보 ... -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          <div>
            <div class="text-accent text-sm mb-1 ml-1">current time</div>
            <div class="bg-base-200 rounded-md text-center py-6 min-w-[120px] sm:min-w-[180px]">
              <span class="font-digital text-3xl sm:text-5xl text-primary tracking-widest select-none">
                {clock_str}
              </span>
            </div>
          </div>
          <div>
            <div class="text-accent text-sm mb-1 ml-1">spend time</div>
            <div class="bg-base-200 rounded-md text-center py-6 min-w-[120px] sm:min-w-[180px]">
              <span class="font-digital text-3xl sm:text-5xl text-primary tracking-widest select-none">
                {formatTime(spend_time)}
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-center items-center gap-4">
            {#if pomoState === PomodoroTimerState.STOPPED}
                <button onclick={() => timer.start()} class="w-full border-2 border-primary rounded-lg py-5 text-2xl text-primary font-bold hover:bg-primary hover:text-base-100 transition mt-4">
                PLAY
                </button>
            {:else if pomoState === PomodoroTimerState.RUNNING}
                <button onclick={() => timer.pause()} class="w-full border-2 border-primary rounded-lg py-5 text-2xl text-primary font-bold hover:bg-primary hover:text-base-100 transition mt-4">
                PAUSE
                </button>
            {:else if pomoState === PomodoroTimerState.PAUSED}
                <button onclick={() => timer.resume()} class="w-full border-2 border-primary rounded-lg py-5 text-2xl text-primary font-bold hover:bg-primary hover:text-base-100 transition mt-4">
                RESUME
                </button>
                <button onclick={() => timer.reset()} class="w-full border-2 border-primary rounded-lg py-5 text-2xl text-primary font-bold hover:bg-primary hover:text-base-100 transition mt-4">
                    RESET
                </button>
            {/if}
          </div>
      </div>

<style lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');
    @reference "tailwindcss";
    @plugin "daisyui";

    .font-digital {
        font-family: 'Orbitron', monospace;
        letter-spacing: 0.1em;
    }
    .main-section {
        @apply flex justify-center items-center min-h-screen bg-base-200;
    }
</style>
