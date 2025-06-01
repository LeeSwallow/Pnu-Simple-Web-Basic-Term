import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { pomodoro } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET = async () => {
    const result = await db.select().from(pomodoro);
    console.log(result);
    return json({timers: result});
}

export const POST = async (request: Request) => {
    const { study_time, break_time } = await request.json();
    const result = await db.insert(pomodoro).values({ study_time, break_time });
    const newTImerId:number = result.lastInsertRowid as number;
    const newTimer = await db.select().from(pomodoro).where(eq(pomodoro.id, newTImerId));
    return json({timer: newTimer});
}   