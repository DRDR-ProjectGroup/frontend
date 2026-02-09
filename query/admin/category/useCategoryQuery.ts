import { useQuery } from '@tanstack/react-query';
import { fetchGroupAndCategory } from '@/lib/api/admin/category';

// 그룹 및 카테고리 조회
export function useGroupAndCategoryQuery() {
  return useQuery({
    queryKey: ['groupAndCategory'],
    queryFn: () => fetchGroupAndCategory(),
    staleTime: 30_000, // 30초
    gcTime: 5 * 60_000, // 5분
  });
}
