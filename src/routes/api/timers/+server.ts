import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { pomodoro } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET = async () => {
    const result = await db.select().from(pomodoro);
    console.log(result);
    return json({timers: result});
}

export const POST = async ({ request }: { request: Request }) => {
    const body = await request.json();
    const { name, workTime, breakTime } = body;
    const result = await db.insert(pomodoro).values({ name, study_time: workTime, break_time: breakTime });
    const newTimerId:number = result.lastInsertRowid as number;
    const newTimer = await db.select().from(pomodoro).where(eq(pomodoro.id, newTimerId));
    return json({timer: newTimer[0]});
}   