import {
    pgTable,
    serial,
    varchar,
    text,
    boolean,
    timestamp,
    integer,
    primaryKey
  } from "drizzle-orm/pg-core";
  
  export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    phone: varchar("phone", { length: 20 }),
    bio: text("bio"),
    website: varchar("website", { length: 255 }),
    avatarUrl: varchar("avatar_url", { length: 255 }),
    isVerified: boolean("is_verified").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  });
  
  // // === ARTICLES ===
  // export const articles = pgTable("articles", {
  //   id: serial("id").primaryKey(),
  //   userId: integer("user_id").notNull().references(() => users.id),
  //   url: varchar("url", { length: 2048 }).notNull(),
  //   title: varchar("title", { length: 255 }).notNull(),
  //   imageUrl: varchar("image_url", { length: 2048 }),
  //   description: text("description"),
  //   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  // });
  
  // // === TAGS ===
  // export const tags = pgTable("tags", {
  //   id: serial("id").primaryKey(),
  //   name: varchar("name", { length: 100 }).notNull().unique(),
  // });
  
  // // === USER_SAVED_ARTICLES (INTERMEDIA) ===
  // export const userSavedArticles = pgTable("user_saved_articles", {
  //   userId: integer("user_id").notNull().references(() => users.id),
  //   articleId: integer("article_id").notNull().references(() => articles.id),
  //   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  // }, (t) => ({
  //   pk: primaryKey({ columns: [t.userId, t.articleId] }),
  // }));
  
  // // === ARTICLE_TAGS (INTERMEDIA) ===
  // export const articleTags = pgTable("article_tags", {
  //   articleId: integer("article_id").notNull().references(() => articles.id),
  //   tagId: integer("tag_id").notNull().references(() => tags.id),
  // }, (t) => ({
  //   pk: primaryKey({ columns: [t.articleId, t.tagId] }),
  // }));
  
  // // === ARTICLE_REQUESTS ===
  // export const articleRequests = pgTable("article_requests", {
  //   id: serial("id").primaryKey(),
  //   userId: integer("user_id").notNull().references(() => users.id),
  //   url: varchar("url", { length: 2048 }).notNull(),
  //   title: varchar("title", { length: 255 }).notNull(),
  //   description: text("description"),
  //   status: varchar("status", { length: 50 }).default('pending'),
  //   adminComment: text("admin_comment"),
  //   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  //   updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  // });
  
  // // === NEWSLETTER_SUBSCRIBERS ===
  // export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  //   id: serial("id").primaryKey(),
  //   email: varchar("email", { length: 255 }).notNull().unique(),
  //   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  // });
  