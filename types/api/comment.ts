import { ApiResponse, Pagination } from './common';
import { Author } from './author';

/* 댓글 리스트 */
// 댓글 아이템 타입
export interface CommentItem {
  commentId: number;
  author: Author | null; // 삭제된 댓글 경우
  content: string;
  createdAt: string;
  child: CommentItem[] | [];
}

// 페이지네이션
export interface CommentListData extends Pagination {
  comments: CommentItem[];
}

// API 공통 응답 타입
export type CommentListResponse = ApiResponse<CommentListData>;

// 댓글 리스트 조회 파라미터 타입
export interface CommentListParams {
  page?: number;
  postId: number;
}

/* 댓글 작성 */
// 댓글 작성 request
export interface CreateCommentRequest {
  postId: number;
  parentCommentId: null | number;
  content: string;
}

// 댓글 작성 response
export type CreateCommentResponse = ApiResponse<undefined>;

/* 댓글 수정 */
// 댓글 수정 request
export interface UpdateCommentRequest {
  postId: number;
  commentId: number;
  content: string;
}

// 댓글 수정 response
export type UpdateCommentResponse = ApiResponse<undefined>;

/* 댓글 삭제 */
// 댓글 삭제 request
export interface DeleteCommentRequest {
  postId: number;
  commentId: number;
}

// 댓글 삭제 response
export type DeleteCommentResponse = ApiResponse<undefined>;
