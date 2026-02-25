import { deleteMessage, sendMessage } from '@/lib/api/message';
import { DeleteMessageParams, SendMessageRequest } from '@/types/api/message';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 쪽지 보내기
export function useSendMessageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: SendMessageRequest) => sendMessage(request),
    onSuccess: (_, request) => {
      queryClient.invalidateQueries({
        queryKey: ['messageList'],
      });
    },
  });
}

// 쪽지 삭제
export function useDeleteMessageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: DeleteMessageParams) => deleteMessage(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messageList'],
      });
    },
  });
}
