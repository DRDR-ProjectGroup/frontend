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
  // params.category : 영어 + 숫자 만 가능 (db에는 이미 적용됨, 여긴 2중 가드)
  if (params.category && !/^[a-zA-Z0-9]+$/.test(params.category)) {
    throw new Error('Invalid category');
  }
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

  // 인코딩 없이 직접 문자열 조합
  // const parts = [];

  // if (params.category && params.category !== 'all') {
  //   parts.push(`cat=${params.category}`); // encodeURIComponent를 쓰지 않음
  // }
  // if (params.page) parts.push(`page=${params.page}`);
  // if (params.size) parts.push(`size=${params.size}`);
  // if (params.searchTarget) parts.push(`searchTarget=${params.searchTarget}`);
  // if (params.searchKeyword) parts.push(`searchKeyword=${params.searchKeyword}`);
  // if (params.sort) parts.push(`sort=${params.sort}`);

  // return parts.join('&');
}

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
