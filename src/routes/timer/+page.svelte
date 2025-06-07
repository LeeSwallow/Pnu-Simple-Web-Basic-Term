<script lang="ts">
    import { createTimer, validateTimer } from '$lib/client/timers';

    let newWorkTime = $state(25);
    let newBreakTime = $state(5);
    let timerName = $state('');

    const addTimer = async () => {
        if (!validateTimer(timerName, newWorkTime, newBreakTime)) return;
        createTimer(timerName, newWorkTime, newBreakTime)
        .then((result) => {
            if (result) {
                alert('타이머가 생성되었습니다!');
                // 폼 초기화
                timerName = '';
                newWorkTime = 25;
                newBreakTime = 5;
            }
        });
    }
</script>

<div class="timer-builder-container">
    <h1 class="timer-builder-title">새 타이머 만들기</h1>
    <div class="timer-builder-form">
            <div class="timer-builder-form-item">
                <label class="timer-builder-label">
                    <span class="timer-builder-label-text">타이머 이름</span>
                    <input 
                        type="text" 
                        bind:value={timerName}
                        placeholder="예: 공부 타이머"
                        class="timer-builder-input"
                    />
                </label>
            </div>

            <div class="timer-builder-inputs-grid">
                <div class="timer-builder-form-item">
                    <label class="timer-builder-label">
                        <span class="timer-builder-label-text">작업 시간 (분)</span>
                        <input 
                            type="number" 
                            bind:value={newWorkTime}
                            min="1"
                            max="60"
                            class="timer-builder-input"
                        />
                    </label>
                </div>

                <div class="timer-builder-form-item">
                    <label class="timer-builder-label">
                        <span class="timer-builder-label-text">휴식 시간 (분)</span>
                        <input 
                            type="number" 
                            bind:value={newBreakTime}
                            min="1"
                            max="30"
                            class="timer-builder-input"
                        />
                    </label>
                </div>
        </div>
        <button 
            class="timer-builder-button"
            onclick={addTimer}
        >
            타이머 생성
        </button>
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    @plugin "daisyui";

    .timer-builder-container {
        @apply mx-auto px-4 py-8;
    }

    .timer-builder-title {
        @apply text-3xl font-bold mb-8 text-center;
    }

    .timer-builder-form {
        @apply max-w-lg mx-auto;
    }

    .timer-builder-card {
        @apply bg-base-100 shadow-xl rounded-2xl p-8;
    }

    .timer-builder-form-item {
        @apply w-full mb-6;
    }

    .timer-builder-label {
        @apply block;
    }

    .timer-builder-label-text {
        @apply block text-base font-medium mb-3 text-base-content;
    }

    .timer-builder-input {
        @apply input w-full text-lg py-3;
    }

    .timer-builder-inputs-grid {
        @apply grid grid-cols-2 gap-6;
    }

    .timer-builder-button {
        @apply btn btn-primary w-full mt-6 py-4 text-lg font-bold;
    }
</style> 