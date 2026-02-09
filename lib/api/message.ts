import { apiDelete, apiGet, apiPost } from '@/lib/api/apiClient';
import {
  DeleteMessageParams,
  DeleteMessageResponse,
  MessageDetailParams,
  MessageDetailResponse,
  MessageListParams,
  MessageListResponse,
  SendMessageRequest,
  SendMessageResponse,
} from '@/types/api/message';

// 쪽지 보내기
export async function sendMessage(
  request: SendMessageRequest,
): Promise<SendMessageResponse> {
  return apiPost<SendMessageResponse>(
    `/messages/${request.receiverId}`,
    request,
    undefined,
    '쪽지 보내기 실패',
  );
}

// 쪽지 목록 조회
export async function fetchMessageList(
  request: MessageListParams,
): Promise<MessageListResponse> {
  return apiGet<MessageListResponse>(
    `/messages?type=${request.type}&page=${request.page}&size=2`,
    undefined,
    '쪽지 목록 조회 실패',
  );
}

// 쪽지 상세 조회
export async function fetchMessageDetail(
  request: MessageDetailParams,
): Promise<MessageDetailResponse> {
  return apiGet<MessageDetailResponse>(
    `/messages/${request.messageId}`,
    undefined,
    '쪽지 상세 조회 실패',
  );
}

// 쪽지 삭제
export async function deleteMessage(
  request: DeleteMessageParams,
): Promise<DeleteMessageResponse> {
  return apiDelete<DeleteMessageResponse>(
    `/messages/${request.messageId}`,
    '쪽지 삭제 실패',
  );
}
