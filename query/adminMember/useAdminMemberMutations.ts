import { changeAdminMemberStatus } from '@/lib/api/admin/member';
import { ChangeMemberStatusRequest } from '@/types/api/adminMember';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 회원 상태 변경
export function useChangeAdminMemberStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ChangeMemberStatusRequest) =>
      changeAdminMemberStatus(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMemberList'] });
    },
  });
}
