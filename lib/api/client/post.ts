import type { PostListResponse, PostListParams } from '@/types/api/postList';
import type { PostDetailResponse } from '@/types/api/postDetail';
import { apiRequest } from '@/lib/api/apiClient';

// 환경변수에서 API Base URL 가져오기
function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_BACKEND_API_BASE_URL is not set');
  }
  return url.replace(/\/$/, '');
}

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
  params: PostListParams = {}
): Promise<PostListResponse> {
  const baseUrl = getApiBaseUrl();
  const sp = buildSearchParams(params);

  const res = await apiRequest(`${baseUrl}/posts?${sp.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data: PostListResponse = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to fetch post list');
  }

  return data;
}

// 글 상세 조회
export async function fetchPostDetail(postId: string): Promise<PostDetailResponse> {
  const baseUrl = getApiBaseUrl();

  const res = await apiRequest(`${baseUrl}/posts/${postId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data: PostDetailResponse = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to fetch post detail');
  }

  return data;
}

// 글 작성
export async function createPost(formData: FormData, category: string): Promise<any> {
  const baseUrl = getApiBaseUrl();

  const res = await apiRequest(`${baseUrl}/posts/${category}`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to create post');
  }

  return data;
}

// 글 수정
export async function updatePost(postId: string, formData: FormData): Promise<any> {
  const baseUrl = getApiBaseUrl();

  const res = await apiRequest(`${baseUrl}/posts/${postId}`, {
    method: 'PUT',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to update post');
  }

  return data;
}

// 글 삭제
export async function deletePost(postId: string): Promise<void> {
  const baseUrl = getApiBaseUrl();

  const res = await apiRequest(`${baseUrl}/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.message || 'Failed to delete post');
  }
}


// 좋아요 기능
export async function likePost(postId: string, likeType: "like" | "dislike"): Promise<any> {
  console.log("likePost", postId, likeType);
  const baseUrl = getApiBaseUrl();

  const res = await apiRequest(`${baseUrl}/posts/${postId}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likeType }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to like post');
  }

  return data;
}