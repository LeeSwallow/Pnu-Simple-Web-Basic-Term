import type { Todo } from "$lib/server/db/schema";
import type { getResTodosDto, createResTodoDto, deleteResTodoDto, createReqTodoDto } from "$lib/server/dto";

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch('/api/todos');
    const data: getResTodosDto = await response.json();
    return data.todos;
}
export const createTodo = async (todo: createReqTodoDto): Promise<Todo> => {
    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    const data: createResTodoDto = await response.json();
    return data.todo as Todo;
}

export const createDefaultTodo = async (): Promise<Todo> => {
    const todo: createReqTodoDto = {
        content: (new Date()).toLocaleDateString(),
        description: (new Date()).toLocaleTimeString() + ' 에 생성된 할 일 입니다.',
        min_pomodoro: 1,
        timer_id: 1,
    }
    const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
    });
    const data: createResTodoDto = await response.json();
    return data.todo as Todo;
}

export const getDefaultTodo = async (): Promise<Todo> => {
    const response = await fetch('/api/todos?content=' + (new Date()).toLocaleDateString());
    const data: getResTodosDto = await response.json();
    return data.todos[0] as Todo;
}

export const deleteTodo = async (id: number): Promise<boolean> => {
    const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) return false;
    const data: deleteResTodoDto = await response.json();
    return data.success;
}

export const getTodo = async (id: number): Promise<Todo | null> => {
    const todos = await getTodos();
    return todos.find((todo) => todo.id === id) || null;
}

export const plusPomodoro = async (id: number, pomodoro: number, study_time: number, break_time: number): Promise<boolean> => {
    const todo = await getTodo(id);
    if (!todo) return false;
    const updatedRes = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            pomodoro: todo.pomodoro + pomodoro,
            completed: (todo.pomodoro + pomodoro) >= todo.min_pomodoro ? 1 : 0,
        }),
    });
    if (!updatedRes.ok) return false;

    const updatedTodo = (await updatedRes.json()).todo as Todo | null;
    if (!updatedTodo) return false;

    const stats = await fetch('/api/stats', {
        method: 'POST',
        body: JSON.stringify({
            date: Date.now(),
            study_time,
            break_time,
            pomodoro: pomodoro,
        }),
    });
    if (!stats.ok || (await stats.json()).success === false) return false;
    return true;
}

export const validateCreateRequest = (todo: createReqTodoDto): boolean => {
    if (todo.content.trim() === '') {
        alert('제목을 입력해주세요');
        return false;
    }
    if (todo.description.trim() === '') {
        alert('설명을 입력해주세요');
        return false;
    }
    if (todo.min_pomodoro < 1) {
        alert('목표 포모도로 수는 최소 1개 이상이어야 합니다');
        return false;
    }
    if (todo.timer_id === 0) {
        alert('타이머를 선택해주세요');
        return false;
    }
    return true;
}
