import {
  MemberInfoResponse,
  MyPostListResponse,
  NicknameRequest,
  NicknameResponse,
  PasswordRequest,
  PasswordResponse,
  ResignRequest,
  ResignResponse,
  MyCommentListResponse,
} from '@/types/api/member';
import { apiDelete, apiGet, apiPatch } from './apiClient';

/* 내 정보 */
// 내 정보 조회
export async function fetchMemberInfo(): Promise<MemberInfoResponse> {
  return apiGet<MemberInfoResponse>(`/members/me`, {
    errorMessage: '내 정보 조회 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

// 닉네임 변경
export async function changeNickname({
  newNickname,
}: NicknameRequest): Promise<NicknameResponse> {
  return apiPatch<NicknameResponse>(`/members/me/nickname`, {
    body: { newNickname },
    errorMessage: '닉네임 변경 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

// 비밀번호 변경
export async function changePassword({
  password,
  newPassword,
  newPassword2,
}: PasswordRequest): Promise<PasswordResponse> {
  return apiPatch<PasswordResponse>(`/members/me/password`, {
    body: { password, newPassword, newPassword2 },
    errorMessage: '비밀번호 변경 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

// 회원 탈퇴
export async function resign({
  password,
}: ResignRequest): Promise<ResignResponse> {
  return apiDelete<ResignResponse>(`/members/resign`, {
    body: { password },
    errorMessage: '회원 탈퇴 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

/* 내 작성글 */
// 내 작성글 조회
export async function fetchMyPosts({
  page,
}: {
  page: number;
}): Promise<MyPostListResponse> {
  return apiGet<MyPostListResponse>(`/members/me/posts?page=${page}`, {
    errorMessage: '내 작성글 조회 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

/* 내 댓글 */
// 내 댓글 조회
export async function fetchMyComments({
  page,
}: {
  page: number;
}): Promise<MyCommentListResponse> {
  return apiGet<MyCommentListResponse>(`/members/me/comments?page=${page}`, {
    errorMessage: '내 댓글 조회 실패',
    requireAuthOptions: { requireAuth: true },
  });
}
