import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = new Database(env.DATABASE_URL);

export const db = drizzle(client, { schema });

// db.select().from(schema.pomodoro).then(
//     timers => {
//         if (timers.length == 0) {
//             console.log("기본 타이머를 추가합니다!");
//             db.insert(schema.pomodoro).values([
//                 {
//                     study_time: 25,
//                     break_time: 5,
//                 },{
//                     study_time: 50,
//                     break_time: 10,
//                 }
//             ]).then(
//                 (result) => {
//                     console.log("기본 타이머를 추가했습니다!");
//                     console.log(result);
//                 }
//             )
//         } else {
//             console.log("기본 타이머가 이미 존재합니다!");
//         }
//     }
// )