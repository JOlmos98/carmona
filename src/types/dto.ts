export type UserDTO = {
  id?: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string | null;
  bio?: string | null;
  website?: string | null;
  isVerified?: string | null;
};

// export type ArticleDTO = {
//   id: number;
//   userId: number;
//   url: string;
//   title: string;
//   imageUrl?: string | null;
//   description?: string | null;
//   createdAt?: string | null;
//   savedAt?: string | null; // Para la tabla del dashboard
// };

// export type ArticleRequestDTO = {
//   id: number;
//   userId: number;
//   url: string;
//   title: string;
//   description?: string | null;
//   status?: string | null;
//   createdAt?: string | null;
//   updatedAt?: string | null;
// };

// export type TagDTO = {
//   id: number;
//   name: string;
// };

// export type SavedArticleDTO = {
//   id: number;
//   userId: number;
//   articleId: number;
// };

// export type ArticleTagDTO = {
//   id: number;
//   articleId: number;
//   tagId: number;
// };