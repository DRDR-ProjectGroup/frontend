import { PostListResponse } from '@/types/api/postList';
import type { PostListParams } from '@/lib/api/post.server';

function buildSearchParams(params: PostListParams) {
  const sp = new URLSearchParams();

  // backend 쿼리 키에 맞춤: category -> cat
  if (params.category && params.category !== 'all') sp.set('cat', params.category);
  if (params.page) sp.set('page', String(params.page));
  if (params.size) sp.set('size', String(params.size));
  if (params.searchTarget) sp.set('searchTarget', params.searchTarget);
  if (params.searchKeyword) sp.set('searchKeyword', params.searchKeyword);
  if (params.sort) sp.set('sort', params.sort);

  return sp;
}

function getPublicBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
  if (!raw) {
    throw new Error('NEXT_PUBLIC_BACKEND_API_BASE_URL is not set');
  }
  return raw.replace(/\/$/, '');
}

// 클라이언트에서 백엔드로 직접 호출
export async function fetchPostListClient(
  params: PostListParams = {},
): Promise<PostListResponse> {
  const baseUrl = getPublicBaseUrl();
  const sp = buildSearchParams(params);

  const res = await fetch(`${baseUrl}/posts?${sp.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data: PostListResponse = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to fetch post list');
  }

  return data;
}

