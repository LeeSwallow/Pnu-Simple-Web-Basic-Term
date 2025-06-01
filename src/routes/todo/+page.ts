import type { PageLoad } from './$types';
import type { Todo } from '$lib/server/db/schema';
import type { getResTodosDto } from '$lib/server/dto';


export const load: PageLoad = async ({fetch}) => {
    const response = await fetch('/api/todos');
    const data: getResTodosDto = await response.json();
    return {
        todos: data.todos as Todo[]
    };
}