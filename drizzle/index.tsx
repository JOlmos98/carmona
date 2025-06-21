// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';

// const db = drizzle(process.env.DATABASE_URL!);

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { users } from './schema'

const connectionString = process.env.DATABASE_URL

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString as string, { prepare: false })

import * as schema from "./schema";
export const db = drizzle(client, { schema });
// export const db = drizzle(client);


const allUsers = await db.select().from(users);
console.log(allUsers);