// 게시글 목록 파라미터 유틸
import type { PostListParams, PostListParamsQuery } from '@/types/api/postList';

export function getPostListParams(postListParamsQuery: PostListParamsQuery) {
  const {
    category,
    page,
    sort,
    currentPostId,
    searchMode,
    searchTarget,
    searchKeyword,
  } = postListParamsQuery;

  return {
    searchMode: searchMode ? true : false,
    category: category || '',
    searchTarget: searchTarget || 'ALL',
    searchKeyword: searchKeyword || '',
    page: Math.max(1, Number(page) || 1),
    sort: sort || 'LATEST',
    currentPostId: currentPostId || undefined,
  };
}

// 게시글 목록 조회용 쿼리 파라미터 생성
export function buildSearchParams(params: PostListParams) {
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
}
