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

    const target = await db.query.todo.findFirst({where: eq(todo.id, parseInt(id))});
    if (!target) return json({todo: null});

    const body = await request.json();
    if (body.content) target.content = body.content;
    if (body.description) target.description = body.description;
    if (body.pomodoro) target.pomodoro = body.pomodoro;
    if (body.min_pomodoro) target.min_pomodoro = body.min_pomodoro;
    target.updatedAt = Date.now();
    const result = await db.update(todo).set(target).where(eq(todo.id, parseInt(id)));
    
    if (result.changes === 0) return json({todo: null});
    const updatedTodo = await db.query.todo.findFirst({where: eq(todo.id, parseInt(id))});
    return json({
        todo: updatedTodo
    });
}

export const DELETE = async ({ params }: { params: { id: string } }): Promise<Response> => {
    const { id } = params;
    const result = await db.delete(todo).where(eq(todo.id, parseInt(id)));
    return json({
        success: (result.changes > 0)
    });
}