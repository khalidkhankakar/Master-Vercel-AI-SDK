import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const usersModel = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export default usersModel;
