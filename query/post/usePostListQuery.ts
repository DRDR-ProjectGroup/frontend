import { useQuery } from '@tanstack/react-query';
import { fetchPostList } from '@/lib/api/post';
import type { PostListParams } from '@/types/api/postList';

// 글 리스트 조회
export function usePostListQuery(params: PostListParams = {}) {
  const {
    category = 'all',
    page = 1,
    size = 20,
    searchTarget = 'ALL',
    searchKeyword = '',
    sort = 'LATEST',
  } = params;

  return useQuery({
    queryKey: [
      'postList',
      category,
      page,
      size,
      searchTarget,
      searchKeyword,
      sort,
    ],
    queryFn: () =>
      fetchPostList({
        category,
        page,
        size,
        searchTarget,
        searchKeyword,
        sort,
      }),
    staleTime: 30_000, // 30초
    gcTime: 5 * 60_000, // 5분
  });
}
