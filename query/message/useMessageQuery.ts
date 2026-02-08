import { MessageDetailParams, MessageListParams } from '@/types/api/message';
import { useQuery } from '@tanstack/react-query';
import { fetchMessageDetail, fetchMessageList } from '@/lib/api/message';

// 쪽지 List 조회
export function useMessageListQuery(params: MessageListParams) {
  return useQuery({
    queryKey: ['messageList', params.type, params.page],
    queryFn: () => fetchMessageList(params),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}

// 쪽지 상세 조회
export function useMessageDetailQuery(params: MessageDetailParams) {
  return useQuery({
    queryKey: ['messageDetail', params.messageId],
    queryFn: () => fetchMessageDetail(params),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
