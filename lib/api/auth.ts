import { LoginRequest, LoginResponse, LogoutResponse } from '@/types/api/auth';
import { apiRequest, getApiBaseUrl } from './apiClient';
import { ApiError } from '../error/api';

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
    throw new ApiError(data.message, data.code);
  }

  // Response Header에서 accessToken 추출
  const authHeader = response.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError('토큰을 받지 못했습니다.', data.code);
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
    throw new ApiError(data.message, data.code);
  }
  return data;
}

// 토큰 재발급 API 호출
export async function refreshAccessToken(): Promise<string | null> {
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

    // 응답 헤더에서 새 액세스 토큰 추출
    const authHeader = res.headers.get('Authorization');
    if (!authHeader) throw new ApiError('Authorization 헤더 없음', result.code);

    const newToken = authHeader.replace('Bearer ', '');
    return newToken;
  } catch (error) {
    // console.log(
    //   'refreshAccessToken error => refreshToken 만료, reissue failed: ',
    //   error,
    // );
    throw error;
  }
}
