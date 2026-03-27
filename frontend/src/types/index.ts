export interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  user_id: string;
  user_email: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

export interface PostCreateInput {
  title: string;
  description: string;
  category: string;
  user_id: string;
  user_email?: string;
}

export interface PostFilters {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}
