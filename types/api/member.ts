import { ApiResponse } from './common';

// 내 정보 아이템 타입
export interface MemberInfoData {
  memberId: number;
  username: string;
  nickname: string;
  email: string;
}

// 내 정보 조회 API response 타입
export type MemberInfoResponse = ApiResponse<MemberInfoData>;

// 닉네임 변경 request
export type NicknameRequest = {
  newNickname: string;
};

// 닉네임 변경 response
export type NicknameResponse = ApiResponse<undefined>;

// 비밀번호 변경 request
export type PasswordRequest = {
  password: string;
  newPassword: string;
  newPassword2: string;
};

// 비밀번호 변경 response
export type PasswordResponse = ApiResponse<undefined>;

// 회원 탈퇴 request
export type ResignRequest = {
  password: string;
};

// 회원 탈퇴 response
export type ResignResponse = ApiResponse<undefined>;
