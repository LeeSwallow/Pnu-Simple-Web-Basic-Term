<script lang="ts">
    import { goto } from '$app/navigation';

    let title = '';
    let description = '';
    let minPomodoro = 1;
    let selectedTimer = '25+5'; // 기본값: 25분 작업 + 5분 휴식

    const timerOptions = [
        { value: '25+5', label: '25분 작업 + 5분 휴식' },
        { value: '50+10', label: '50분 작업 + 10분 휴식' }
    ];

    function handleSubmit() {
        // TODO: 실제 데이터 저장 로직 구현
        const newTodo = {
            id: Date.now(),
            content: title,
            description,
            min_pomodoro: minPomodoro,
            pomodoro: 0,
            completed: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            timerType: selectedTimer
        };
        
        console.log('New Todo:', newTodo);
        goto('/todo'); // Todo 리스트 페이지로 이동
    }
</script>

<div class="main-section">
        <h1 class="text-2xl font-bold mb-6">새로운 Todo 작성</h1>
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-6 w-full">
        <!-- 제목 입력 -->
        <div class="input-group mb-2">
            <label class="label" for="todoTitle">
                <span class="label-text font-semibold">Todo 제목</span>
            </label>
            <input 
                id="todoTitle"
                type="text" 
                bind:value={title}
                class="input input-bordered w-full"
                placeholder="할 일의 제목을 입력하세요"
                required
            />
        </div>

        <!-- 설명 입력 -->
        <div class="input-group mb-2">
            <label class="label" for="todoDescription">
                <span class="label-text font-semibold">상세 설명</span>
            </label>
            <textarea 
                id="todoDescription"
                bind:value={description}
                class="textarea textarea-bordered h-24 w-full"
                placeholder="할 일에 대한 상세 설명을 입력하세요"
                required
            ></textarea>
        </div>

        <!-- 목표 포모도로 수 -->
        <div class="input-group mb-2">
            <label class="label" for="minPomodoro">
                <span class="label-text font-semibold">목표 포모도로 수</span>
            </label>
            <input 
                id="minPomodoro"
                type="number" 
                bind:value={minPomodoro}
                min="1"
                class="input input-bordered w-full"
                required
            />
            <span class="label-text-alt text-xs">목표로 하는 포모도로 횟수를 입력하세요</span>
        </div>

        <!-- 타이머 선택 -->
        <div class="input-group mb-2">
            <label class="label" for="timerSelect">
                <span class="label-text font-semibold">타이머 설정</span>
            </label>
            <select 
                id="timerSelect"
                bind:value={selectedTimer}
                class="select select-bordered w-full"
            >
                {#each timerOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
            <span class="label-text-alt text-xs">
                설정에서 더 많은 타이머 옵션을 추가할 수 있습니다
            </span>
        </div>

        <!-- 버튼 그룹 -->
        <div class="flex justify-end gap-4 mt-8">
            <button 
                type="button" 
                class="btn btn-ghost"
                on:click={() => goto('/todo')}
            >
                취소
            </button>
            <button 
                type="submit" 
                class="btn btn-primary"
            >
                Todo 생성
            </button>
        </div>
    </form>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    @plugin "daisyui";

    .todo-form {
        @apply bg-base-100 rounded-2xl p-8 shadow-xl w-full m-8;
        /* 폼이 컨테이너를 가득 채움 */
    }
    .input-group {
        @apply bg-base-200 rounded-lg p-4 mb-2;
    }
    .label-text-alt {
        @apply text-xs;
    }
</style> 