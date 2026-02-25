import { likePost } from '@/lib/api/like';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 글 좋아요/싫어요 Mutation Hook
export function useLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      likeType,
    }: {
      postId: number;
      likeType: 'like' | 'dislike';
    }) => likePost(postId, likeType),
    onSuccess: (data, variables) => {
      // queryClient.invalidateQueries({ queryKey: ['like', variables.postId] });
      queryClient.setQueryData(['like', variables.postId], data);
    },
    onError: (error) => {
      console.error('like mutation error:', error);
    },
  });
}
