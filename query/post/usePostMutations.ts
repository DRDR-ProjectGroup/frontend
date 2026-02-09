import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, updatePost, deletePost, likePost } from '@/lib/api/post';

// 글 작성 Mutation Hook
export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      formData,
      category,
    }: {
      formData: FormData;
      category: string;
    }) => createPost(formData, category),
    onSuccess: () => {
      // 글 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['postList'] });
    },
  });
}

// 글 수정 Mutation Hook
export function useUpdatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      formData,
    }: {
      postId: number;
      formData: FormData;
    }) => updatePost(postId, formData),
    onSuccess: (_, variables) => {
      // 글 목록 및 상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['postList'] });
      queryClient.invalidateQueries({
        queryKey: ['postDetail', variables.postId],
      });
    },
  });
}

// 글 삭제 Mutation Hook
export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      // 글 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['postList'] });
    },
  });
}

// 글 좋아요/싫어요 Mutation Hook
export function useLikePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      likeType,
    }: {
      postId: number;
      likeType: 'like' | 'dislike';
    }) => likePost(postId, likeType),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['postList'] });
      queryClient.invalidateQueries({
        queryKey: ['postDetail', variables.postId],
      });
    },
  });
}
