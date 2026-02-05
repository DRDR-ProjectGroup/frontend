import { useQuery } from '@tanstack/react-query';
import { fetchMemberInfo } from '@/lib/api/mypage';

// 내 정보 조회
export function useMemberInfoQuery() {
  return useQuery({
    queryKey: ['memberInfo'],
    queryFn: () => fetchMemberInfo(),
    staleTime: 30000,
    gcTime: 5 * 60000, // 5분
  });
}
