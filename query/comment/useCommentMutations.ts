import { createComment, deleteComment, updateComment } from '@/lib/api/comment';
import {
  CreateCommentRequest,
  DeleteCommentRequest,
  UpdateCommentRequest,
} from '@/types/api/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 댓글 작성
export function useCreateCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateCommentRequest) => createComment(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
      queryClient.invalidateQueries({ queryKey: ['commentCount'] });
      queryClient.invalidateQueries({ queryKey: ['myPage', 'comments'] });
    },
  });
}

// 댓글 수정
export function useUpdateCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateCommentRequest) => updateComment(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['commentList', variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ['myPage', 'comments'] });
    },
  });
}

// 댓글 삭제
export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: DeleteCommentRequest) => deleteComment(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['commentList', variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ['commentCount'] });
      queryClient.invalidateQueries({ queryKey: ['myPage', 'comments'] });
    },
  });
}
