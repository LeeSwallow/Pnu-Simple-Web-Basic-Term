import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        todos: await db.select().from(todo)
    };
}