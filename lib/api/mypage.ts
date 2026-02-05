import {
  MemberInfoResponse,
  NicknameRequest,
  NicknameResponse,
  PasswordRequest,
  PasswordResponse,
  ResignRequest,
  ResignResponse,
} from '@/types/api/member';
import { apiDelete, apiGet, apiPatch } from './apiClient';

// 내 정보 조회
export async function fetchMemberInfo(): Promise<MemberInfoResponse> {
  return apiGet<MemberInfoResponse>(
    `/members/me`,
    undefined,
    '내 정보 조회 실패',
  );
}

// 닉네임 변경
export async function changeNickname({
  newNickname,
}: NicknameRequest): Promise<NicknameResponse> {
  return apiPatch<NicknameResponse>(
    `/members/me/nickname`,
    { newNickname },
    undefined,
    '닉네임 변경 실패',
  );
}

// 비밀번호 변경
export async function changePassword({
  password,
  newPassword,
  newPassword2,
}: PasswordRequest): Promise<PasswordResponse> {
  return apiPatch<PasswordResponse>(
    `/members/me/password`,
    { password, newPassword, newPassword2 },
    undefined,
    '비밀번호 변경 실패',
  );
}

// 회원 탈퇴
export async function resign({
  password,
}: ResignRequest): Promise<ResignResponse> {
  return apiDelete<ResignResponse>(
    `/members/resign`,
    { password },
    undefined,
    '회원 탈퇴 실패',
  );
}
