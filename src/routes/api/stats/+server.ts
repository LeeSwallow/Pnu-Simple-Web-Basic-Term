import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { study_stats } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET = async () => {
    const result = await db.select().from(study_stats);
    return json(result);
}

export const POST = async ({ request }: { request: Request }) => {
    const body = await request.json();
    const {date, study_time, break_time, pomodoro} = body;
    
    const today_stats = await db.query.study_stats.findFirst({where: eq(study_stats.date, date)});

    let result;

    if (today_stats) {
        today_stats.total_study_time += study_time;
        today_stats.total_break_time += break_time;
        today_stats.total_pomodoro += pomodoro;
        result = await db.update(study_stats).set(today_stats).where(eq(study_stats.id, today_stats.id));
    } else {
        result = await db.insert(study_stats).values({date, total_study_time: study_time, total_break_time: break_time, total_pomodoro: pomodoro});
    }

    return json({success: result.changes > 0});
}