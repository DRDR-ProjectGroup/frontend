import {
  CreateCommentRequest,
  CreateCommentResponse,
  CommentListParams,
  CommentListResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  CommentCountResponse,
} from '@/types/api/comment';
import { apiDelete, apiGet, apiPatch, apiPost } from './apiClient';

// 댓글 리스트 조회
export async function fetchCommentList(
  params: CommentListParams,
): Promise<CommentListResponse> {
  return apiGet<CommentListResponse>(
    `/posts/${params.postId}/comments?page=${params.page || 1}`,
    {
      errorMessage: '댓글 리스트 조회 실패',
      requireAuthOptions: { requireAuth: true },
    },
  );
}

// 댓글 작성
export async function createComment(
  request: CreateCommentRequest,
): Promise<CreateCommentResponse> {
  return apiPost<CreateCommentResponse>(`/posts/${request.postId}/comments`, {
    body: {
      content: request.content,
      parentCommentId: request.parentCommentId,
    },
    errorMessage: '댓글 작성 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

// 댓글 수정
export async function updateComment(
  request: UpdateCommentRequest,
): Promise<UpdateCommentResponse> {
  return apiPatch<UpdateCommentResponse>(
    `/posts/${request.postId}/comments/${request.commentId}`,
    {
      body: { content: request.content },
      errorMessage: '댓글 수정 실패',
      requireAuthOptions: { requireAuth: true },
    },
  );
}

// 댓글 삭제
export async function deleteComment(
  request: DeleteCommentRequest,
): Promise<DeleteCommentResponse> {
  return apiDelete<DeleteCommentResponse>(
    `/posts/${request.postId}/comments/${request.commentId}`,
    {
      errorMessage: '댓글 삭제 실패',
      requireAuthOptions: { requireAuth: true },
    },
  );
}

// 댓글 개수 조회
export async function fetchCommentCount({
  postId,
}: {
  postId: number;
}): Promise<CommentCountResponse> {
  return apiGet<CommentCountResponse>(`/posts/${postId}/comments/count`, {
    errorMessage: '댓글 개수 조회 실패',
  });
}
