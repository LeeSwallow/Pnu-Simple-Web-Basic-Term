<script lang="ts">
import { createAnimatable } from 'animejs';
import { onMount } from 'svelte';

export let activeTodo: {
  content: string;
  description: string;
} = {
  content: "선택된 TODO 없음",
  description: "좌측에서 할 일을 선택해 주세요."
};

let clockElement: HTMLElement;
let clock: any;
let isRunning = false;
let timeLeft = 25 * 60; // 25분
let timerInterval: number;

const startTimer = () => {
  if (isRunning) return;
  isRunning = true;
  
  timerInterval = window.setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      timeLeft = 25 * 60;
      // 알림음 재생
      new Audio('/notification.mp3').play().catch(() => {});
    }
    updateClock();
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
  isRunning = false;
};

const resetTimer = () => {
  stopTimer();
  timeLeft = 25 * 60;
  updateClock();
};

const updateClock = () => {
  if (!clock) return;
  const progress = 1 - (timeLeft / (25 * 60));
  const angle = progress * Math.PI * 2;
  clock.rotate(angle);
};

onMount(() => {
  if (clockElement) {
    clock = createAnimatable(clockElement, {
      rotate: { unit: 'rad' },
      duration: 400,
    });
  }
});
</script>

<div class="main-section">
  <div class="w-96 bg-base-100 rounded-2xl p-6 mx-auto shadow-lg relative">
    <div class="flex justify-between items-center mb-2">
      <span class="text-primary font-bold text-lg">포모도로 타이머</span>
      <button class="text-accent hover:text-accent-focus">
        <svg width="20" height="20" fill="currentColor"><!-- 아이콘 --></svg>
      </button>
    </div>
    <div class="mb-2">
      <div class="text-base font-semibold text-base-content">{activeTodo.content}</div>
      <div class="text-sm text-base-content/70">{activeTodo.description}</div>
    </div>
    <div class="text-accent text-sm mb-1 ml-1">current time</div>
    <div class="bg-base-200 rounded-md text-center py-3 mb-4">
      <span class="font-digital text-5xl text-primary tracking-widest select-none">
        {String(timeLeft).padStart(4, '0')}
      </span>
    </div>
    <button
      class="w-full border-2 border-primary rounded-lg py-2 text-primary font-bold hover:bg-primary hover:text-base-100 transition"
      on:click={startTimer}
    >
      PLAY
    </button>
  </div>
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
