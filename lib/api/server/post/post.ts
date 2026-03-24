import { PostDetailResponse } from '@/types/api/postDetail';
import { serverApiGet, serverApiPutFormData } from '../apiHelpers';

// 게시글 상세 조회
export async function fetchPostDetail(
  postId: number,
): Promise<PostDetailResponse> {
  return serverApiGet<PostDetailResponse>(`/posts/${postId}`, {
    options: {
      next: { revalidate: 60, tags: [`post-${postId}`] }, // fetch 결과를 60초 동안 캐싱
    },
    errorMessage: '게시글 조회 실패',
    handle404: true,
  });
}

// 게시글 수정
export async function updatePost(
  postId: number,
  formData: FormData,
): Promise<PostDetailResponse> {
  return serverApiPutFormData<PostDetailResponse>(
    `/posts/${postId}`,
    formData,
    {
      options: {
        method: 'PUT',
      },
      errorMessage: '게시글 수정 실패',
      handle404: true,
    },
  );
}
