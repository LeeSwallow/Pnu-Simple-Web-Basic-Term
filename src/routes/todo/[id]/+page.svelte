<script lang="ts">
import { createAnimatable } from 'animejs';
import { onMount } from 'svelte';

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
  <div class="timer-container">
    <div class="clock" bind:this={clockElement}></div>
    <div class="timer-display">
      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
    </div>
    <div class="controls">
      {#if !isRunning}
        <button on:click={startTimer}>시작</button>
      {:else}
        <button on:click={stopTimer}>일시정지</button>
      {/if}
      <button on:click={resetTimer}>리셋</button>
    </div>
  </div>
</div>

<style>
.main-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.timer-container {
  text-align: center;
}

.clock {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: #ffffff;
  position: relative;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.clock::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 140px;
  background: #ff6b6b;
  transform-origin: 50% 0;
  transform: translateX(-50%);
}

.timer-display {
  font-size: 3rem;
  font-weight: bold;
  margin: 20px 0;
  color: #333;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:last-child {
  background-color: #f44336;
}

button:last-child:hover {
  background-color: #da190b;
}
</style>
