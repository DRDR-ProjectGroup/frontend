import { ApiResponse } from '@/types/api/common';
import { apiPost } from '../apiClient';

// 공지 등록
export async function postNotice(postId: string): Promise<ApiResponse> {
  return apiPost<ApiResponse>(`/posts/${postId}/notice`, {
    errorMessage: '공지 등록 실패',
    requireAuthOptions: { requireAuth: true },
  });
}
