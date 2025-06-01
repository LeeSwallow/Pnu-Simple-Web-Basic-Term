import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { study_stats } from '$lib/server/db/schema';

export const GET = async () => {
    const result = await db.select().from(study_stats);
    return json(result);
}
