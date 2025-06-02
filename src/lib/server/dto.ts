import type { Todo, Pomodoro } from "./db/schema";

export interface getResTodosDto {
    todos: Todo[];
}

export interface TodoDto {
    id: number;
    content: string;
    description: string;
    min_pomodoro: number;
    pomodoro: number,
    completed: number;
    created_at: number;
    updated_at: number;
    timer: {
        id: number;
        study_time: number;
        break_time: number;
    } | null;
}

export interface postStatsDto {
    date: number;
    study_time: number;
    break_time: number;
    pomodoro: number;
}

export interface getResTodoByIdDto {
    todo: TodoDto | null;
}

export interface createResTodoDto {
    todo: Todo | null;
}

export interface updateResTodoDto {
    todo: Todo | null;
}

export interface deleteResTodoDto {
    success: boolean;
}

export interface createReqTodoDto {
    content: string;
    description: string;
    min_pomodoro: number;
    timer_id: number;
}

export interface getResPomodoroDto { timers: Pomodoro[];}

export interface updateReqTodoDto {
    content: string;
    description: string;
    min_pomodoro: number;
    timer_id: number;
}

export interface createResPomodoroDto { timer: Pomodoro | null;}