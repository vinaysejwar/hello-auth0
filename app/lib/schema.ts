import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  auth0_id: text('auth0_id').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
});
