import { defineConfig } from 'drizzle-kit';

// For build process, use a temporary database
const DATABASE_URL = process.env.DATABASE_URL || 'file:./local.db';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/lib/server/db/schema.ts',
	dbCredentials: { url: DATABASE_URL },
	verbose: true,
	strict: true
});
