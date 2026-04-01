import type { PostListResponse, PostListParams } from '@/types/api/postList';
import type { PostDetailResponse } from '@/types/api/postDetail';
import {
  apiGet,
  apiPost,
  apiDelete,
  apiPostFormData,
  apiPutFormData,
} from '@/lib/api/client/apiHelpers';
import { buildSearchParams } from '@/lib/utils/getPostListParams';

// 글 리스트 조회
export async function fetchPostList(
  params: PostListParams = {},
): Promise<PostListResponse> {
  const sp = buildSearchParams(params);
  return apiGet<PostListResponse>(`/posts?${sp.toString()}`, {
    errorMessage: 'Failed to fetch post list',
  });
}

// 글 상세 조회
export async function fetchPostDetail(
  postId: number,
): Promise<PostDetailResponse> {
  return apiGet<PostDetailResponse>(`/posts/${postId}`, {
    errorMessage: 'Failed to fetch post detail',
  });
}

// 글 작성
export async function createPost(
  formData: FormData,
  category: string,
): Promise<any> {
  return apiPostFormData(`/posts/${category}`, formData, {
    errorMessage: 'Failed to create post',
    requireAuthOptions: { requireAuth: true },
  });
}

// 글 수정
export async function updatePost(
  postId: number,
  formData: FormData,
): Promise<any> {
  return apiPutFormData(`/posts/${postId}`, formData, {
    errorMessage: 'Failed to update post',
    requireAuthOptions: { requireAuth: true },
  });
}

// 글 삭제
export async function deletePost(postId: number): Promise<void> {
  await apiDelete(`/posts/${postId}`, {
    errorMessage: 'Failed to delete post',
    requireAuthOptions: { requireAuth: true },
  });
}

// 좋아요 기능
export async function likePost(
  postId: number,
  likeType: 'like' | 'dislike',
): Promise<any> {
  return apiPost(`/posts/${postId}/like`, {
    body: { likeType },
    errorMessage: 'Failed to like post',
    requireAuthOptions: { requireAuth: true },
  });
}
