import { PostDetailResponse } from '@/types/api/postDetail';
import {
  serverApiGet,
  serverApiPostFormData,
  serverApiPutFormData,
} from '../apiHelpers';

// 게시글 상세 조회
export async function fetchPostDetail(
  postId: number,
): Promise<PostDetailResponse> {
  return serverApiGet<PostDetailResponse>(`/posts/${postId}`, {
    options: {
      next: { revalidate: 60, tags: [`post-${postId}`] }, // fetch 결과를 60초 동안 캐싱
    },
  });
}

// 게시글 작성
export async function createPost(
  formData: FormData,
  category: string,
): Promise<PostDetailResponse> {
  return serverApiPostFormData<PostDetailResponse>(
    `/posts/${category}`,
    formData,
  );
}

// 게시글 수정
export async function updatePost(
  postId: number,
  formData: FormData,
): Promise<PostDetailResponse> {
  return serverApiPutFormData<PostDetailResponse>(`/posts/${postId}`, formData);
}
