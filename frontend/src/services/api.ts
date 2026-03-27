import axios from 'axios';
import { Post, PostsResponse, PostCreateInput, PostFilters } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

export const postsApi = {
  getAll: async (filters: PostFilters = {}): Promise<PostsResponse> => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));
    const { data } = await api.get(`/posts?${params.toString()}`);
    return data;
  },

  getMy: async (userId: string, page = 1, limit = 10): Promise<PostsResponse> => {
    const { data } = await api.get(`/posts/my?user_id=${userId}&page=${page}&limit=${limit}`);
    return data;
  },

  create: async (post: PostCreateInput): Promise<Post> => {
    const { data } = await api.post('/posts', post);
    return data;
  },

  delete: async (postId: number, userId: string): Promise<void> => {
    await api.delete(`/posts/${postId}?user_id=${userId}`);
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await api.get('/categories');
    return data;
  },
};
