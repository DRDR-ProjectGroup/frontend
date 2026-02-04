import { LoginRequest, LoginResponse, LogoutResponse } from '@/types/api/auth';
import { apiRequest, getApiBaseUrl } from './apiClient';

// 로그인
export async function login(
  request: LoginRequest,
): Promise<LoginResponse & { accessToken: string }> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(`${baseUrl}/members/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '로그인 실패');
  }

  // Response Header에서 accessToken 추출
  const authHeader = response.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('토큰을 받지 못했습니다.');
  }
  const accessToken = authHeader.replace('Bearer ', '');

  // body + accessToken 반환
  return {
    ...data,
    accessToken,
  };
}

// 로그아웃
export async function logout(): Promise<LogoutResponse> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(`${baseUrl}/members/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '로그아웃 실패');
  }
  return data;
}
