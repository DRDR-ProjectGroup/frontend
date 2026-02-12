import { apiGet, apiPost } from '@/lib/api/apiClient';

// 좋아요 / 싫어요 등록
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

// 추천 수 조회
export async function getLikeCount(postId: number): Promise<any> {
  return apiGet(`/posts/${postId}/likecount`, {
    errorMessage: 'Failed to get like count',
  });
}
