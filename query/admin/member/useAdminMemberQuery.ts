import { useQuery } from '@tanstack/react-query';
import { fetchGroupAndCategory } from '@/lib/api/admin/category';
import { fetchAdminMemberList } from '@/lib/api/admin/member';
import { AdminMemberListParams } from '@/types/api/adminMember';

// 회원 리스트 조회
export function useAdminMemberListQuery(params: AdminMemberListParams) {
  return useQuery({
    queryKey: ['adminMemberList', params.page, params.size],
    queryFn: () => fetchAdminMemberList(params),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
