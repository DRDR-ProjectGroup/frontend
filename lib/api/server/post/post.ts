import { PostDetailResponse } from '@/types/api/postDetail';
import { PostListParams } from '@/types/api/postList';
import {
  serverApiGet,
  serverApiDelete,
  serverApiPostFormData,
  serverApiPutFormData,
} from '../apiHelpers';
import { PostListResponse } from '@/types/api/postList';
import { buildSearchParams } from '@/lib/utils/getPostListParams';

// 게시글 목록 조회
export async function fetchPostList(
  params: PostListParams,
): Promise<PostListResponse> {
  const sp = buildSearchParams(params);
  return serverApiGet<PostListResponse>(`/posts?${sp.toString()}`, {
    options: {
      next: { revalidate: 60, tags: ['post-list'] },
    },
  });
}

// 게시글 상세 조회
export async function fetchPostDetail(
  postId: number,
): Promise<PostDetailResponse> {
  return serverApiGet<PostDetailResponse>(`/posts/${postId}`, {
    options: {
      next: { revalidate: 60, tags: [`post-detail-${postId}`] },
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

// 게시글 삭제
export async function deletePost(postId: number): Promise<PostDetailResponse> {
  return serverApiDelete<PostDetailResponse>(`/posts/${postId}`);
}
