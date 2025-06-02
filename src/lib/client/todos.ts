import type { Todo } from "$lib/server/db/schema";
import type { getResTodosDto, createResTodoDto, updateResTodoDto, deleteResTodoDto, createReqTodoDto } from "$lib/server/dto";

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

export const deleteTodo = async (id: number): Promise<boolean> => {
    const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) return false;
    const data: deleteResTodoDto = await response.json();
    return data.success;
}

export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
    });
    const data: updateResTodoDto = await response.json();
    return data.todo as Todo;
}

export const getTodo = async (id: number): Promise<Todo | null> => {
    const todos = await getTodos();
    return todos.find((todo) => todo.id === id) || null;
}

export const plusPomodoro = async (id: number, pomodoro: number, study_time: number, break_time: number): Promise<boolean> => {
    const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            pomodoro: pomodoro,
        }),
    });

    if (!res.ok) return false;
    const todo = (await res.json()).todo;
    if (!todo) return false;
    
    const stats = await fetch('/api/stats', {
        method: 'POST',
        body: JSON.stringify({
            date: Date.now(),
            study_time,
            break_time,
            pomodoro: 1,
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
