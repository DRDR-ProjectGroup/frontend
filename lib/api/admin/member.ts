import {
  AdminMemberListParams,
  AdminMemberListResponse,
  ChangeMemberStatusRequest,
  ChangeMemberStatusResponse,
} from '@/types/api/adminMember';
import { apiGet, apiPatch } from '../apiClient';

// 회원 조회
export async function fetchAdminMemberList(
  request: AdminMemberListParams,
): Promise<AdminMemberListResponse> {
  return apiGet<AdminMemberListResponse>(
    `/admin/members?page=${request.page}&size=${request.size}`,
    undefined,
    '회원 조회 실패',
  );
}

// 회원 상태 변경
export async function changeAdminMemberStatus(
  request: ChangeMemberStatusRequest,
): Promise<ChangeMemberStatusResponse> {
  return apiPatch<ChangeMemberStatusResponse>(
    `/admin/members/${request.memberId}`,
    { status: request.status },
    undefined,
    '회원 상태 변경 실패',
  );
}
