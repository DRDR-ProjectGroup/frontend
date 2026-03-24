import { ApiResponse } from './common';

/* 로그인 */
export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = ApiResponse<undefined>;

/* 로그아웃 */
export type LogoutResponse = ApiResponse<undefined>;

// 사용자 role
export type UserRole = 'ROLE_MEMBER' | 'ROLE_ADMIN';

// 로그인 검증 후 리다이렉트 옵션
export type RequireAuthOptions = {
  requireAuth?: boolean;
  replaceLoginPage?: boolean;
};
