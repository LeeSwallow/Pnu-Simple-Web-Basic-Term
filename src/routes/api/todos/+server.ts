import { json } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';

export const GET = async (): Promise<Response> => {
    const result = await db.select().from(todo).orderBy(desc(todo.updatedAt));
    return json({
        todos: result,
    });
}

export const POST = async ({ request }: { request: Request }): Promise<Response> => {
    const body = await request.json();
    const { content, description, min_pomodoro, timer_id } = body;

    console.log(content, description, min_pomodoro, timer_id);
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const result = await db.insert(todo).values({ content, description, min_pomodoro, timer_id, createdAt, updatedAt });
    const insertedId : number = result.lastInsertRowid as number;
    const newTodo = await db.select().from(todo).where(eq(todo.id, insertedId));
    const isSuccess = (result.changes > 0);
    return json({
        todo: isSuccess ? newTodo[0] : null,
    });
}