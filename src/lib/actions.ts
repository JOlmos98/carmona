'use server';

import { signIn, signOut } from "@/backend/auth";

export async function signInWithGoogle() {await signIn("google");}

export async function signInWithGitHub() {await signIn("github");}

export async function logOut() {await signOut({ redirectTo: "/" });}







// import { db } from '@/db/drizzle';
// import { articles } from '@/db/drizzle/schema';
// import { ArticleDTO } from '@/types/dto';

// export async function getAllArticles(): Promise<ArticleDTO[]> {
  
//   try {

//     const dbArticles = await db.select({
//       id: articles.id,
//       userId: articles.userId,
//       url: articles.url,
//       title: articles.title,
//       imageUrl: articles.imageUrl,
//       description: articles.description,
//       createdAt: articles.createdAt,
//     }).from(articles);

//     const formatted: ArticleDTO[] = dbArticles.reverse().map((a) => ({
//       id: a.id,
//       userId: a.userId,
//       url: a.url,
//       title: a.title,
//       imageUrl: a.imageUrl ?? null,
//       description: a.description ?? null,
//       createdAt: a.createdAt ? a.createdAt.toString() : null, //toISOString(),
//     }));

//     return formatted;

//   } catch (error) {
//     console.error('Error fetching articles:', error);
//     return [];
//   }
// }
