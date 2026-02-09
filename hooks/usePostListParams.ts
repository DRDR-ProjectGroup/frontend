// 게시글 목록 파라미터 훅
import { useSearchParams } from 'next/navigation';
import type {
  PostListSearchTargetType,
  PostListSortType,
} from '@/types/api/postList';

export function usePostListParams(defaultCategory: string) {
  const searchParams = useSearchParams();

  return {
    searchMode: searchParams.get('searchMode') === 'true',
    category: searchParams.get('category') || defaultCategory,
    searchTarget:
      (searchParams.get('searchTarget') as PostListSearchTargetType) || 'ALL',
    searchKeyword: searchParams.get('searchKeyword') || '',
    page: Math.max(1, Number(searchParams.get('page') || 1)),
    sort: (searchParams.get('sort') as PostListSortType) || 'LATEST',
    currentPostId: Number(searchParams.get('currentPostId')) || undefined,
  };
}
