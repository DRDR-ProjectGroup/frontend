import type { PostListResponse, PostListParams } from '@/types/api/postList';
import type { PostDetailResponse } from '@/types/api/postDetail';
import {
  apiGet,
  apiPost,
  apiDelete,
  apiPostFormData,
  apiPutFormData,
} from '@/lib/api/apiClient';

// 글 리스트 조회용 쿼리 파라미터 생성
function buildSearchParams(params: PostListParams) {
  const sp = new URLSearchParams();

  if (params.category && params.category !== 'all') {
    sp.set('cat', params.category);
  }
  if (params.page) sp.set('page', String(params.page));
  if (params.size) sp.set('size', String(params.size));
  if (params.searchTarget) sp.set('searchTarget', params.searchTarget);
  if (params.searchKeyword) sp.set('searchKeyword', params.searchKeyword);
  if (params.sort) sp.set('sort', params.sort);

  return sp;
}

// 글 리스트 조회
export async function fetchPostList(
  params: PostListParams = {},
): Promise<PostListResponse> {
  const sp = buildSearchParams(params);
  return apiGet<PostListResponse>(
    `/posts?${sp.toString()}`,
    undefined,
    'Failed to fetch post list',
  );
}

// 글 상세 조회
export async function fetchPostDetail(
  postId: number,
): Promise<PostDetailResponse> {
  return apiGet<PostDetailResponse>(
    `/posts/${postId}`,
    undefined,
    'Failed to fetch post detail',
  );
}

// 글 작성
export async function createPost(
  formData: FormData,
  category: string,
): Promise<any> {
  return apiPostFormData(
    `/posts/${category}`,
    formData,
    undefined,
    'Failed to create post',
  );
}

// 글 수정
export async function updatePost(
  postId: string,
  formData: FormData,
): Promise<any> {
  return apiPutFormData(
    `/posts/${postId}`,
    formData,
    undefined,
    'Failed to update post',
  );
}

// 글 삭제
export async function deletePost(postId: string): Promise<void> {
  await apiDelete(`/posts/${postId}`, undefined, 'Failed to delete post');
}

// 좋아요 기능
export async function likePost(
  postId: string,
  likeType: 'like' | 'dislike',
): Promise<any> {
  console.log('likePost', postId, likeType);
  return apiPost(
    `/posts/${postId}/like`,
    { likeType },
    undefined,
    'Failed to like post',
  );
}
