// /types/dto.ts o donde prefieras

export type UserDTO = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  userName: string;
  isVerified: boolean;
  isDonor: boolean;
  end0: boolean;
  end1: boolean;
  end2: boolean;
  end3: boolean;
  end4: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// /types/dto.ts

export type AccountDTO = { id: string; userId: string; type: string; provider: string; providerAccountId: string };

// export type UserDTO = {
//   id?: number;
//   userName: string;
//   email: string;
//   password: string;
//   isVerified?: string | null;
//   isDonor?: string | null;
//   end0?: string | null;
//   end1?: string | null;
//   end2?: string | null;
//   end3?: string | null;
//   end4?: string | null;
// };

// last_name: string;
// phone?: string | null;
// bio?: string | null;
// website?: string | null;

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
