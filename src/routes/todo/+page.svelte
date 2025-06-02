<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Todo } from '$lib/server/db/schema';
    import { deleteTodo } from '$lib/client/todos';
    import type { PageData } from './$types';
    let { data } : { data: PageData } = $props();
    let todos = $state<Todo[]>(data.todos.filter((todo) => todo.visible === 1) as Todo[]);
    let activeTodo = $state<Todo | null>(null);
    let showCompleted = $state(false);
    const handleStartPomodoro = () => {
        if (activeTodo) {
            goto(`/todo/${activeTodo.id}`);
        } else {
            goto(`/todo/${todos[0].id}`);
        }
    }
    const handleCreateTodo = (e: Event) => {
        e.preventDefault();
        goto('/todo/add');
    }

    const handleDeleteTodo = async (id: number) => {
        deleteTodo(id)
        .then((result) => {
            if(result) todos = todos.filter((todo) => todo.id !== id);
        });
    }

    const handleActivateTodo = (todo: Todo) => {
        activeTodo = todo;
    }

</script>

<div class="todo-container">
    
    <div class="todo-header">
        <h1 class="card-title">할일 관리</h1>
        <button class="btn btn-primary btn-sm" onclick={handleCreateTodo}>새로 만들기</button>
    </div>

    <!-- 활성화된 Todo -->
    <div class="active-todo-container">
        <div class="card-body">
            <div class="flex items-center justify-between mb-2">
                <h2 class="card-title">활성화된 Todo</h2>
                <div class="btn-group">
                    {#if activeTodo}
                        <button 
                            class="btn btn-error btn-sm"
                            onclick={() => activeTodo = null}
                        >
                            취소
                        </button>
                        <button 
                            class="btn btn-primary btn-sm"
                            onclick={handleStartPomodoro}
                        >
                            시작
                        </button>
                    {:else}
                        <button 
                            class="btn btn-primary btn-sm"
                            onclick={handleStartPomodoro}
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
        <div class="flex justify-between items-center mb-4">
            <div class="btn-group">
                <h2 class="card-title">Todo 리스트</h2>
            </div>
            <div class="btn-group">
                <label class="label cursor-pointer mr-2">
                    <span class="label-text">완료된 항목 표시</span>
                    <input type="checkbox" bind:checked={showCompleted} class="toggle" />
                </label>
            </div>
        </div>
        <div class="space-y-4">
            {#if todos.length === 0}
                <div class="empty-todo-content">
                    <p class="empty-todo-text">할 일이 없습니다.</p>
                </div>
            {:else}
            {#each todos as todo}
                <div class="todo-item">
                    <div class="todo-content">
                        <h3 class="todo-title">{todo.content}</h3>
                        <p class="todo-description">{todo.description}</p>
                        <div class="todo-badges">
                            {#if (showCompleted) || (todo.completed === 1)}
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
                            onclick={() => handleDeleteTodo(todo.id)}
                        >
                            삭제
                        </button>
                        <button 
                            class="btn btn-primary btn-sm"
                            onclick={() => handleActivateTodo(todo)}
                        >
                            활성화
                        </button>
                    </div>
                </div>
            {/each}
            {/if}
        </div>
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    @plugin "daisyui";

    .todo-container {
        @apply container mx-auto p-4;
        width: 80vw;
    }

    .todo-header {
        @apply mb-8 flex flex-row justify-between;
    }

    .active-todo-container {
        @apply card bg-base-300 shadow-xl mb-8;
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
</style>