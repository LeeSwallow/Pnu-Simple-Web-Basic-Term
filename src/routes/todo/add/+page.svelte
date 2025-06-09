<script lang="ts">
    import { goto } from '$app/navigation';
    
    import { createTodo, validateCreateRequest } from '$lib/client/todos';
    import type { createReqTodoDto } from '$lib/server/dto';
    import type { Pomodoro } from '$lib/server/db/schema';

    const {data} = $props();
    let timers: Pomodoro[] = $state(data.timers as Pomodoro[]);
    
    let title = $state('');
    let description = $state('');
    let minPomodoro = $state(1);
    let selectedTimer = $state(0);


    async function handleSubmit() {
        const reqTodo: createReqTodoDto = {
            content: title,
            description,
            min_pomodoro: minPomodoro,
            timer_id: selectedTimer,
        };

        if (!validateCreateRequest(reqTodo)) {
            return;
        }

        const newTodo = await createTodo(reqTodo);
        if (newTodo) {
            goto(`/todo`);
        }
    }
</script>

<svelte:head>
    <title>새 할일 추가 - 포모도로 Todo</title>
    <meta name="description" content="새로운 할일을 추가하고 포모도로 목표를 설정하세요">
</svelte:head>

<h1 class="todo-create-title">새로운 Todo 작성</h1>

<!-- 폼 시작 -->
<div class="todo-create-form">
<!-- 제목 입력 -->

<div class="input-group">
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
<div class="input-group">
    <label class="label" for="todoDescription">
        상세 설명
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
<div class="input-group">
    <label class="label" for="minPomodoro">목표 포모도로 수</label>
    <input 
        id="minPomodoro"
        type="number" 
        bind:value={minPomodoro}
        min="1"
        class="input input-bordered w-full"
        required
    />
    <span class="description">목표로 하는 포모도로 횟수를 입력하세요</span>
</div>

<!-- 타이머 선택 -->
<div class="input-group">
    <label class="label" for="timerSelect">타이머 설정</label>
    <select 
        id="timerSelect"
        bind:value={selectedTimer}
        class="select select-bordered w-full"
    >
        {#each timers as timer}
            <option value={timer.id}>{timer.name}</option>
        {/each}

    </select>
    <span class="description">
        설정에서 더 많은 타이머 옵션을 추가할 수 있습니다
    </span>
</div>

<!-- 버튼 그룹 -->
<div class="flex justify-end gap-4 mt-8">
    <button 
        type="button" 
        class="btn btn-ghost"
        onclick={() => goto('/todo')}
    >
        취소
    </button>
    <button 
        onclick={handleSubmit}
        class="btn btn-primary"
    >
        Todo 생성
    </button>
</div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    @plugin "daisyui";

    .todo-create-title {
        @apply text-2xl font-bold mb-6;
    }

    .todo-create-form {
        @apply space-y-6 w-full;
    }

    .todo-create-form .input-group {
        @apply bg-base-200 rounded-lg p-4 mb-2;
    }

    .todo-create-form .input-group .label {
        @apply text-sm font-semibold;
    }
    .todo-create-form .input-group .description {
        @apply text-xs text-gray-500;
    }
</style> 