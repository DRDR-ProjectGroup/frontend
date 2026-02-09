import { likePost } from '@/lib/api/like';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
      queryClient.invalidateQueries({ queryKey: ['like', variables.postId] });
    },
  });
}
