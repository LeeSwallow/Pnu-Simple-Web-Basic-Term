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
        }
    ];

    let todos = $state<Todo[]>(initialTodos);
    let activeTodo = $state<Todo | null>(null);
    let showCompleted = $state(false);

    let filteredTodos = $derived(todos.filter(todo => showCompleted || todo.completed === 0));

    function activateTodo(todo: Todo) {
        activeTodo = todo;
    }

    function deleteTodo(id: number) {
        todos = todos.filter(todo => todo.id !== id);
    }

    function startPomodoro(todo: Todo) {
        goto(`/todo/${todo.id}`);
    }
</script>

<div class="main-section">
    <h1 class="text-3xl font-bold mb-8">포모도로 Todo</h1>
    
    <!-- 활성화된 Todo -->
    <div class="card bg-base-300 shadow-xl mb-8 border-2 border-primary">
        <div class="card-body">
            <div class="flex items-center mb-2">
                <span class="badge badge-primary mr-2">현재 활성화</span>
                <h2 class="card-title m-0">활성화된 Todo</h2>
            </div>
            {#if activeTodo}
                <div class="flex items-center justify-between">
                    <div class="p-4 rounded-lg bg-primary/10 border border-primary shadow">
                        <h3 class="text-xl font-bold text-primary">{activeTodo.content}</h3>
                        <p class="text-sm text-gray-600">{activeTodo.description}</p>
                        <div class="badge badge-primary mt-2">
                            {activeTodo.pomodoro}/{activeTodo.min_pomodoro} 포모도로
                        </div>
                    </div>
                    <button 
                        class="btn btn-primary"
                        on:click={() => startPomodoro(activeTodo!)}
                    >
                        시작
                    </button>
                </div>
            {:else}
                <div class="flex items-center justify-between">
                    <p class="text-gray-500">활성화된 todo가 없습니다. 그냥 시작하시겠습니까?</p>
                    <button 
                        class="btn btn-primary"
                        on:click={() => startPomodoro(initialTodos[0])}
                    >
                        시작
                    </button>
                </div>
            {/if}
        </div>
    </div>
    
    <!-- Todo 리스트 -->
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                    <h2 class="card-title">Todo 리스트</h2>
                    <button class="btn btn-accent btn-sm" on:click={() => alert('새 Todo 만들기!')}>새로 만들기</button>
                </div>
                <label class="label cursor-pointer">
                    <span class="label-text mr-2">완료된 항목 표시</span>
                    <input type="checkbox" bind:checked={showCompleted} class="toggle" />
                </label>
            </div>
            
            <div class="space-y-4">
                {#each filteredTodos as todo}
                    <div class="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold">{todo.content}</h3>
                            <p class="text-sm text-gray-600">{todo.description}</p>
                            <div class="flex gap-2 mt-2">
                                <div class="badge badge-primary">
                                    {todo.pomodoro}/{todo.min_pomodoro} 포모도로
                                </div>
                                {#if todo.completed === 1}
                                    <div class="badge badge-success">완료</div>
                                {/if}
                            </div>
                        </div>
                        <div class="flex gap-2">
                            {#if !todo.completed}
                                <button 
                                    class="btn btn-primary btn-sm"
                                    on:click={() => activateTodo(todo)}
                                >
                                    활성화
                                </button>
                            {/if}
                            <button 
                                class="btn btn-error btn-sm"
                                on:click={() => deleteTodo(todo.id)}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .container {
        max-width: 800px;
    }
</style>