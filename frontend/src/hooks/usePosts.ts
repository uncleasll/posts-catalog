import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../services/api';
import { PostCreateInput, PostFilters } from '../types';
import toast from 'react-hot-toast';

export const POSTS_KEY = 'posts';
export const MY_POSTS_KEY = 'my-posts';
export const CATEGORIES_KEY = 'categories';

export function usePosts(filters: PostFilters) {
  return useQuery({
    queryKey: [POSTS_KEY, filters],
    queryFn: () => postsApi.getAll(filters),
    staleTime: 30_000,
  });
}

export function useMyPosts(userId: string | undefined, page = 1) {
  return useQuery({
    queryKey: [MY_POSTS_KEY, userId, page],
    queryFn: () => postsApi.getMy(userId!, page),
    enabled: !!userId,
    staleTime: 30_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: [CATEGORIES_KEY],
    queryFn: () => postsApi.getCategories(),
    staleTime: 60_000,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (post: PostCreateInput) => postsApi.create(post),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [POSTS_KEY] });
      qc.invalidateQueries({ queryKey: [MY_POSTS_KEY] });
      qc.invalidateQueries({ queryKey: [CATEGORIES_KEY] });
      toast.success('Post created successfully!');
    },
    onError: () => {
      toast.error('Failed to create post. Please try again.');
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: number; userId: string }) =>
      postsApi.delete(postId, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [POSTS_KEY] });
      qc.invalidateQueries({ queryKey: [MY_POSTS_KEY] });
      toast.success('Post deleted.');
    },
    onError: () => {
      toast.error('Failed to delete post.');
    },
  });
}
