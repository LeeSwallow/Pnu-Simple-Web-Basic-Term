import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch}) => {
    const response = await fetch("/api/timers");
    const data = await response.json();
    console.log(data);
    return {
        timers: data.timers,
    };
}