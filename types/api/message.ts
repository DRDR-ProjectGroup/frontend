import { Author } from './author';
import { ApiResponse, Pagination } from './common';

/* 쪽지 보내기 */
// 쪽지 보내기 request
export interface SendMessageRequest {
  receiverId: number;
  content: string;
}

// 쪽지 보내기 response
export type SendMessageResponse = ApiResponse<undefined>;

/* 쪽지 List 조회 */
// 쪽지 아이템 타입
export interface MessageItem {
  messageId: number;
  sender: Author;
  receiver: Author;
  content: string;
  createdAt: string;
}

// 페이지네이션
export interface MessageListData extends Pagination {
  messages: MessageItem[];
}

// API 공통 응답 타입
export type MessageListResponse = ApiResponse<MessageListData>;

// 쪽지 List 조회 파라미터 타입
export interface MessageListParams {
  page?: number;
  type: 'inbox' | 'sent';
}

/* 쪽지 상세 조회 */
// 쪽지 상세 조회 request
export interface MessageDetailParams {
  messageId: number;
}

// 쪽지 상세 조회 response
export type MessageDetailResponse = ApiResponse<MessageItem>;

/* 쪽지 삭제 */
// 쪽지 삭제 파라미터 타입
export interface DeleteMessageParams {
  messageId: number;
}

// 쪽지 삭제 response
export type DeleteMessageResponse = ApiResponse<undefined>;
