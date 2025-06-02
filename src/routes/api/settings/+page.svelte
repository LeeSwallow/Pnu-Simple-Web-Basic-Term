<script lang="ts">
    import { onMount } from 'svelte';
    
    interface PomodoroTimer {
        id: number;
        name: string;
        workTime: number;
        breakTime: number;
        isActive: boolean;
    }
    
    let timers: PomodoroTimer[] = [];
    let newWorkTime = 25;
    let newBreakTime = 5;
    let timerName = '';
    let selectedSound = 'default';
    let volume = 0.5;

    const alarmSounds = [
        { id: 'default', name: '기본 알람' },
        { id: 'bell', name: '종소리' },
        { id: 'chime', name: '차임벨' },
        { id: 'digital', name: '디지털 알람' }
    ];

    // 로컬 스토리지에서 설정 불러오기
    onMount(() => {
        const savedTimers = localStorage.getItem('pomodoroTimers');
        const savedSettings = localStorage.getItem('pomodoroSettings');
        
        if (savedTimers) {
            timers = JSON.parse(savedTimers);
        }
        
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            selectedSound = settings.sound || 'default';
            volume = settings.volume || 0.5;
        }
    });

    // 새 타이머 추가
    function addTimer() {
        if (!timerName) {
            alert('타이머 이름을 입력해주세요!');
            return;
        }

        const newTimer: PomodoroTimer = {
            id: Date.now(),
            name: timerName,
            workTime: newWorkTime,
            breakTime: newBreakTime,
            isActive: false
        };

        timers = [...timers, newTimer];
        saveTimers();
        
        // 입력 필드 초기화
        timerName = '';
        newWorkTime = 25;
        newBreakTime = 5;

        alert('타이머가 생성되었습니다!');
    }

    // 타이머 삭제
    function deleteTimer(timerId: number) {
        timers = timers.filter(timer => timer.id !== timerId);
        saveTimers();
    }

    // 타이머 목록 저장
    function saveTimers() {
        localStorage.setItem('pomodoroTimers', JSON.stringify(timers));
    }

    // 알람 설정 저장
    function saveAlarmSettings() {
        const settings = {
            sound: selectedSound,
            volume: volume
        };
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
        alert('알람 설정이 저장되었습니다!');
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">포모도로 설정</h1>

    <!-- 새 타이머 추가 폼 -->
    <div class="card bg-base-100 shadow-xl mb-8">
        <div class="card-body">
            <h2 class="card-title mb-4">새 타이머 추가</h2>
            <div class="grid gap-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">타이머 이름</span>
                    </label>
                    <input 
                        type="text" 
                        bind:value={timerName}
                        placeholder="예: 공부 타이머"
                        class="input input-bordered w-full"
                    />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">작업 시간 (분)</span>
                        </label>
                        <input 
                            type="number" 
                            bind:value={newWorkTime}
                            min="1"
                            max="60"
                            class="input input-bordered"
                        />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">휴식 시간 (분)</span>
                        </label>
                        <input 
                            type="number" 
                            bind:value={newBreakTime}
                            min="1"
                            max="30"
                            class="input input-bordered"
                        />
                    </div>
                </div>

                <button 
                    class="btn btn-primary mt-4"
                    on:click={addTimer}
                >
                    타이머 추가
                </button>
            </div>
        </div>
    </div>

    <!-- 알람 설정 -->
    <div class="card bg-base-100 shadow-xl mb-8">
        <div class="card-body">
            <h2 class="card-title mb-4">알람 설정</h2>
            <div class="grid gap-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">알람 소리 선택</span>
                    </label>
                    <select 
                        bind:value={selectedSound}
                        class="select select-bordered w-full"
                    >
                        {#each alarmSounds as sound}
                            <option value={sound.id}>{sound.name}</option>
                        {/each}
                    </select>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">볼륨</span>
                    </label>
                    <input 
                        type="range" 
                        bind:value={volume}
                        min="0"
                        max="1"
                        step="0.1"
                        class="range range-primary"
                    />
                </div>

                <button 
                    class="btn btn-secondary mt-4"
                    on:click={saveAlarmSettings}
                >
                    알람 설정 저장
                </button>
            </div>
        </div>
    </div>

    <!-- 타이머 목록 -->
    <div class="grid gap-4">
        {#each timers as timer (timer.id)}
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-xl font-bold">{timer.name}</h3>
                            <p class="text-base-content/70">
                                작업: {timer.workTime}분 / 휴식: {timer.breakTime}분
                            </p>
                        </div>
                        <button 
                            class="btn btn-error btn-sm"
                            on:click={() => deleteTimer(timer.id)}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    @plugin "daisyui";
</style>
