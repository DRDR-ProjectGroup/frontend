import { ApiResponse, Pagination } from './common';

/* 회원 정보 리스트 */
// 회원 아이템 타입
export interface AdminMemberItem {
  createdAt: string;
  deletedAt: string | null;
  email: string;
  memberId: number;
  modifiedAt: string;
  nickname: string;
  role: string;
  status: 'ACTIVE' | 'BLOCKED' | 'DELETED';
  username: string;
}

// 페이지네이션
export interface AdminMemberListData extends Pagination {
  members: AdminMemberItem[];
}

// API 공통 응답 타입
export type AdminMemberListResponse = ApiResponse<AdminMemberListData>;

// 회원 리스트 조회 파라미터 타입
export interface AdminMemberListParams {
  page?: number;
  size?: number;
}

/* 회원 상태 변경 */
// 회원 상태 변경 request
export interface ChangeMemberStatusRequest {
  memberId: number;
  status: 'BLOCKED' | 'ACTIVE';
}

// 회원 상태 변경 response
export type ChangeMemberStatusResponse = ApiResponse<undefined>;
