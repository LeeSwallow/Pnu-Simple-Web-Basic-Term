import type { PageLoad } from "./$types";
import type { getResTodoByIdDto, TodoDto } from "$lib/server/dto";

export const load: PageLoad = async ({params, fetch}) => {
    const {id} = params;
    const response = await fetch(`/api/todos/${id}`);
    const data: getResTodoByIdDto = await response.json();
    return {
        todo: data.todo as TodoDto
    };
}