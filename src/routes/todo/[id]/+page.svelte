<script lang="ts">
import { onMount } from 'svelte';
import { PomodoroTimer } from '$lib/client/pomodoro';

const { data } = $props();
const { todo } = data;
const timer = new PomodoroTimer(todo.timer?.study_time ?? 25, todo.timer?.break_time ?? 5);

let clock_str = $state("00:00");
function formatTime(timeLeft: number) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

timer.onTick = ((timeLeft) => {
    console.log(timeLeft);
    clock_str = formatTime(timeLeft);
});

timer.onComplete = ((phase) => {
    console.log(phase);
});

</script>

  <div class="w-96 bg-base-100 rounded-2xl p-6 mx-auto shadow-lg relative">
    <div class="flex justify-between items-center mb-2">
        <span class="text-primary font-bold text-lg">포모도로 타이머</span>
    </div>
    <div class="mb-2">
        <div class="text-base font-semibold text-base-content">{todo.content}</div>
        <div class="text-sm text-base-content/70">{todo.description}</div>
    </div>
    <div class="text-accent text-sm mb-1 ml-1">current time</div>
    <div class="bg-base-200 rounded-md text-center py-3 mb-4">
        <span class="font-digital text-5xl text-primary tracking-widest select-none">
            {clock_str}
        </span>
    </div>
    <button onclick={() => timer.start()} class="w-full border-2 border-primary rounded-lg py-2 text-primary font-bold hover:bg-primary hover:text-base-100 transition">
        PLAY
    </button>
  </div>

<style lang="postcss">
    @reference "tailwindcss";
    @plugin "daisyui";
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

    .font-digital {
        font-family: 'Orbitron', monospace;
        letter-spacing: 0.1em;
    }
    .main-section {
        @apply flex justify-center items-center min-h-screen bg-base-200;
    }
</style>
