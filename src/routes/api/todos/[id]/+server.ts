import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';

export const GET = async ({ params }: { params: { id: string } }): Promise<Response> => {
    const { id } = params;
    const result = await db.query.todo.findFirst({
        where: eq(todo.id, parseInt(id)),
        with: {
            timer: true
        }
    });
    
    return json({
        todo: result
    });
}

export const PUT = async ({ params, request }: { params: { id: string }, request: Request }): Promise<Response> => {
    const { id } = params;
    const body = await request.json();
    const { content, description, min_pomodoro, timer_id } = body;

    const result = await db.update(todo).set({ content, description, min_pomodoro, timer_id }).where(eq(todo.id, parseInt(id)));

    const updatedId = result.lastInsertRowid as number;
    
    const updatedTodo = await db.select().from(todo).where(eq(todo.id, updatedId));
    return json({
        todo: updatedTodo[0]
    });
}

export const DELETE = async ({ params }: { params: { id: string } }): Promise<Response> => {
    const { id } = params;
    const result = await db.delete(todo).where(eq(todo.id, parseInt(id)));
    return json({
        success: (result.changes > 0)
    });
}