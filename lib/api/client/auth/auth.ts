import { LoginRequest, LoginResponse, LogoutResponse } from '@/types/api/auth';
import { getApiBaseUrl } from '@/lib/api/client/apiHelpers';
import { apiRequest } from '@/lib/api/client/apiRequest';
import { ApiError } from '@/lib/error/api';

// 로그인
export async function login(request: LoginRequest): Promise<LoginResponse> {
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
    throw new ApiError(data.message, data.code);
  }
  return data;
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
    throw new ApiError(data.message, data.code);
  }
  return data;
}

// 토큰 재발급 API 호출
export async function reissueAccessToken(): Promise<void> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/auth/reissue`, {
      method: 'POST',
      credentials: 'include', // 쿠키의 refreshToken 포함
    });

    const result = await res.json();

    if (!res.ok) {
      throw new ApiError(result.message, result.code);
    }
  } catch (error) {
    console.log('reissue failed: ', error);
    throw error;
  }
}
