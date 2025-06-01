<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    interface Todo {
        id: number;
        content: string;
        description: string;
        min_pomodoro: number;
        pomodoro: number;
        completed: number;
        createdAt: number;
        updatedAt: number;
    }

    const initialTodos: Todo[] = [
        {
            id: 1,
            content: "SvelteKit 학습하기",
            description: "SvelteKit의 기본 개념과 라우팅, 서버 사이드 렌더링 등 학습",
            min_pomodoro: 4,
            pomodoro: 2,
            completed: 0,
            createdAt: Date.now() - 86400000,
            updatedAt: Date.now() - 43200000,
        },
        {
            id: 2,
            content: "포트폴리오 웹사이트 만들기",
            description: "개인 포트폴리오 웹사이트 디자인 및 구현",
            min_pomodoro: 6,
            pomodoro: 0,
            completed: 0,
            createdAt: Date.now() - 172800000,
            updatedAt: Date.now() - 172800000,
        },
        {
            id: 3,
            content: "React Hooks 마스터하기",
            description: "useState, useEffect, useContext 등 주요 Hooks 학습 및 실습",
            min_pomodoro: 8,
            pomodoro: 8,
            completed: 1,
            createdAt: Date.now() - 259200000,
            updatedAt: Date.now() - 86400000,
        },
        {
            id: 4,
            content: "TypeScript 기초 학습",
            description: "타입 시스템, 인터페이스, 제네릭 등 TypeScript 기본 개념 학습",
            min_pomodoro: 6,
            pomodoro: 6,
            completed: 1,
            createdAt: Date.now() - 345600000,
            updatedAt: Date.now() - 172800000,
        }
    ];

    let todos = $state<Todo[]>(initialTodos);
    let activeTodo = $state<Todo | null>(null);
    let showCompleted = $state(false);
    let showCreateForm = false;
    let newTodo = {
        content: '',
        description: '',
        min_pomodoro: 1
    };

    let filteredTodos = $derived(todos.filter(todo => showCompleted || todo.completed === 0));

    function activateTodo(todo: Todo) {
        activeTodo = todo;
    }

    function deactivateTodo() {
        activeTodo = null;
    }

    function deleteTodo(id: number) {
        todos = todos.filter(todo => todo.id !== id);
    }

    function startPomodoro(todo: Todo) {
        goto(`/todo/${todo.id}`);
    }

    function handleCreateTodo() {
        todos = [
            ...todos,
            {
                id: Date.now(),
                content: newTodo.content,
                description: newTodo.description,
                min_pomodoro: Number(newTodo.min_pomodoro),
                pomodoro: 0,
                completed: 0,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
        ];
        newTodo = { content: '', description: '', min_pomodoro: 1 };
        showCreateForm = false;
    }
</script>

<div class="main-section">
    <h1 class="card-title mb-8">포모도로 Todo</h1>
    
    <!-- 활성화된 Todo -->
    <div class="active-todo-container">
        <div class="card-body">
            <div class="flex items-center justify-between mb-2">
                <h2 class="card-title">활성화된 Todo</h2>
                <div class="btn-group">
                    {#if activeTodo}
                        <button 
                            class="btn btn-error btn-sm"
                            on:click={deactivateTodo}
                        >
                            취소
                        </button>
                        <button 
                            class="btn btn-primary btn-sm"
                            on:click={() => startPomodoro(activeTodo!)}
                        >
                            시작
                        </button>
                    {:else}
                        <button 
                            class="btn btn-primary btn-sm"
                            on:click={() => startPomodoro(initialTodos[0])}
                        >
                            그냥 시작하기
                        </button>
                    {/if}
                </div>
            </div>
            {#if activeTodo}
                <div class="active-todo-content">
                    <h3 class="active-todo-title">{activeTodo.content}</h3>
                    <p class="active-todo-description">{activeTodo.description}</p>
                    <div class="active-todo-badge">
                        {activeTodo.pomodoro}/{activeTodo.min_pomodoro} 포모도로
                    </div>
                </div>
            {:else}
                <div class="empty-todo-content">
                    <p class="empty-todo-text">활성화된 todo가 없습니다.</p>
                </div>
            {/if}
        </div>
    </div>
    
    <!-- Todo 리스트 -->
    <div class="todo-list-container">
        <div class="card-body">
            <div class="flex justify-between items-center mb-4">
                <div class="btn-group">
                    <h2 class="card-title">Todo 리스트</h2>
                    <button class="btn btn-accent btn-sm" on:click={() => showCreateForm = true}>새로 만들기</button>
                </div>
                <label class="label cursor-pointer">
                    <span class="label-text mr-2">완료된 항목 표시</span>
                    <input type="checkbox" bind:checked={showCompleted} class="toggle" />
                </label>
            </div>
            
            {#if showCreateForm}
            <form class="todo-form" on:submit|preventDefault={handleCreateTodo}>
                <div class="form-control mb-2">
                    <label class="label">
                        <span class="label-text">제목</span>
                    </label>
                    <input class="input input-bordered w-full" type="text" bind:value={newTodo.content} required placeholder="할 일 제목을 입력하세요" />
                </div>
                <div class="form-control mb-2">
                    <label class="label">
                        <span class="label-text">설명</span>
                    </label>
                    <textarea class="textarea textarea-bordered w-full" rows="3" bind:value={newTodo.description} required placeholder="할 일 설명을 입력하세요"></textarea>
                </div>
                <div class="form-control mb-4">
                    <label class="label">
                        <span class="label-text">최소 포모도로 횟수</span>
                    </label>
                    <input class="input input-bordered w-full" type="number" min="1" bind:value={newTodo.min_pomodoro} required placeholder="예: 4" />
                </div>
                <div class="flex gap-2 justify-end">
                    <button type="button" class="btn btn-ghost" on:click={() => showCreateForm = false}>취소</button>
                    <button type="submit" class="btn btn-primary">추가</button>
                </div>
            </form>
            {/if}
            
            <div class="space-y-4">
                {#each filteredTodos as todo}
                    <div class="todo-item">
                        <div class="todo-content">
                            <h3 class="todo-title">{todo.content}</h3>
                            <p class="todo-description">{todo.description}</p>
                            <div class="todo-badges">
                                {#if todo.completed === 1}
                                    <div class="badge badge-success">
                                        완료: {todo.pomodoro} 포모도로
                                    </div>
                                {:else}
                                    <div class="badge {todo.pomodoro >= todo.min_pomodoro ? 'badge-success' : 'badge-primary'}">
                                        {todo.pomodoro}/{todo.min_pomodoro} 포모도로
                                    </div>
                                {/if}
                            </div>
                        </div>
                        <div class="todo-actions">
                            <button 
                                class="btn btn-error btn-sm"
                                on:click={() => deleteTodo(todo.id)}
                            >
                                삭제
                            </button>
                            <button 
                                class="btn btn-primary btn-sm"
                                on:click={() => activateTodo(todo)}
                            >
                                활성화
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    @plugin "daisyui";

    .main-section {
        @apply container mx-auto p-4;
    }

    .active-todo-container {
        @apply card bg-base-300 shadow-xl mb-8 border-2 border-primary;
    }

    .todo-list-container {
        @apply card bg-base-100 shadow-xl;
    }

    .card-body {
        @apply p-6;
    }

    .card-title {
        @apply text-2xl font-bold;
    }

    .active-todo-content {
        @apply w-full p-4 rounded-lg bg-primary/10 border border-primary shadow;
    }

    .active-todo-title {
        @apply text-xl font-bold text-primary;
    }

    .active-todo-description {
        @apply text-sm text-gray-600;
    }

    .active-todo-badge {
        @apply badge badge-primary mt-2;
    }

    .empty-todo-content {
        @apply w-full p-4 rounded-lg bg-base-200;
    }

    .empty-todo-text {
        @apply text-gray-500;
    }

    .todo-item {
        @apply flex items-center justify-between p-4 bg-base-200 rounded-lg;
    }

    .todo-content {
        @apply flex-1;
    }

    .todo-title {
        @apply text-lg font-semibold;
    }

    .todo-description {
        @apply text-sm text-gray-600;
    }

    .todo-badges {
        @apply flex gap-2 mt-2;
    }

    .todo-actions {
        @apply flex gap-2;
    }

    .btn-group {
        @apply flex gap-2;
    }

    .todo-form {
        @apply bg-base-200 rounded-xl p-6 mb-6 shadow flex flex-col gap-2 border border-base-300;
    }
    .form-control {
        @apply flex flex-col;
    }
    .input, .textarea {
        @apply bg-base-100 text-base-content;
    }
</style>