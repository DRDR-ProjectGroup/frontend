import { postNotice } from '@/lib/api/admin/notice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 공지 등록
export const usePostNoticeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => postNotice(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList'] });
      queryClient.invalidateQueries({ queryKey: ['postDetail'] });
    },
  });
};
