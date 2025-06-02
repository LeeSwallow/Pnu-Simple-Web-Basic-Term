<script lang="ts">
    import { onMount } from 'svelte';
    import { createTimer, validateTimer } from '$lib/client/timers';

    let newWorkTime = $state(25);
    let newBreakTime = $state(5);
    let timerName = $state('');
    let selectedSound = $state('default');
    let volume = $state(0.5);

    const alarmSounds = [
        { id: 'default', name: '기본 알람' },
        { id: 'bell', name: '종소리' },
        { id: 'chime', name: '차임벨' },
        { id: 'digital', name: '디지털 알람' }
    ];

    const addTimer = async () => {
        if (!validateTimer(timerName, newWorkTime, newBreakTime)) return;
        createTimer(timerName, newWorkTime, newBreakTime)
        .then((result) => {
            if (result) {
                alert('타이머가 생성되었습니다!');
            }
        });
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">포모도로 설정</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 타이머 생성 섹션 -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title mb-4">타이머 생성</h2>
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
                        onclick={addTimer}
                    >
                        타이머 생성
                    </button>
                </div>
            </div>
        </div>

        <!-- 알람 설정 섹션 -->
        <div class="card bg-base-100 shadow-xl">
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
                        onclick={()=> {}}
                    >
                        알람 설정 저장
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    @plugin "daisyui";
</style>