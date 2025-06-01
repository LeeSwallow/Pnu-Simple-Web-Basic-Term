import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

/*
할 일을 저장하는 테이블
*/
export const todo = sqliteTable('todo', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	content: text('content').notNull(),
	description: text('description').notNull(),
	min_pomodoro: integer('min_pomodoro', { mode: 'number' }).notNull().default(1), // 목표로 잡은 최소 포모도로 개수
	pomodoro: integer('pomodoro', { mode: 'number' }).notNull().default(0), // 현재 완료한 포모도로 개수
	completed: integer('completed', { mode: 'number' }).notNull().default(0), // 완료 여부 (0: 미완료, 1: 완료)
	createdAt: integer('created_at', { mode: 'number' }),
	updatedAt: integer('updated_at', { mode: 'number' }),
});

/*
 뽀모도로 타이머를 저장하는 테이블
*/
export const pomodoro = sqliteTable('pomdoro_timer', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	todo_id: integer('todo_id', { mode: 'number' }).references(() => todo.id),
	study_time: integer('study_time', { mode: 'number' }),
	break_time: integer('break_time', { mode: 'number' }),
});

/*
 학습 통계를 저장하는 테이블
*/
export const study_stats = sqliteTable('study_stats', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	date: integer('date', { mode: 'number' }).notNull(),
	total_study_time: integer('total_study_time', { mode: 'number' }).notNull().default(0),
	total_break_time: integer('total_break_time', { mode: 'number' }).notNull().default(0),
	total_pomodoro: integer('total_pomodoro', { mode: 'number' }).notNull().default(0),
});