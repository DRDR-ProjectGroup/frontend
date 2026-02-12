/**
 * API 클라이언트 (fetch 인스턴스 대용)
 * - 자동으로 Authorization 헤더 추가
 * - 401 에러 시 자동으로 토큰 재발급 시도
 * - 재발급 실패 시 로그아웃 처리
 */

import { refreshAccessToken } from './auth';
import { RequireAuthOptions } from '@/types/api/auth';
import { ApiError } from '../error/api';
import { useAuthStore } from '../store/authStore';

interface ApiRequestOptionalParamsType {
  body?: any;
  options?: RequestInit;
  errorMessage?: string;
  requireAuthOptions?: RequireAuthOptions;
}

/**
 * 환경변수에서 API Base URL 가져오기
 */
export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_BACKEND_API_BASE_URL is not set');
  }
  return url.replace(/\/$/, '');
}

/**
 * API 요청 함수 (fetch wrapper)
 * - 자동으로 Authorization 헤더 추가
 * - 401 에러 시 토큰 재발급 시도
 */
export async function apiRequest(
  url: string,
  options: RequestInit = {},
  requireAuthOptions?: RequireAuthOptions,
): Promise<Response> {
  const token = useAuthStore.getState().accessToken;

  // 요청 헤더 구성
  const headers: HeadersInit = {
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // 첫 번째 요청
  let response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // 쿠키 포함 (refreshToken)
  });

  // 401 에러 처리 (access token 만료)
  if (response.status === 401) {
    console.log('access token 만료, refresh token 재발급 시도...');

    // access token 재발급 시도
    try {
      const newToken = await refreshAccessToken();
      console.log('newToken : ', newToken);
      // 재발급 성공 -> 원래 요청 재시도
      const retryHeaders: HeadersInit = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      };
      response = await fetch(url, {
        ...options,
        headers: retryHeaders,
        credentials: 'include',
      });
    } catch (error) {
      // access token 재발급 실패 (refresh token 만료)
      console.error('access token 재발급 실패 : ', error);
      useAuthStore.getState().clearAuth();
      if (requireAuthOptions?.requireAuth) {
        window.location.href = '/login';
      }
      throw error;
    }
  }

  return response;
}

/**
 * GET 요청 헬퍼
 */
export async function apiGet<T = any>(
  endpoint: string,
  {
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(errorMessage || error.message, error.code);
  }

  return response.json();
}

/**
 * POST 요청 헬퍼
 */
export async function apiPost<T = any>(
  endpoint: string,
  {
    body,
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(errorMessage || error.message, error.code);
  }

  return response.json();
}

/**
 * PUT 요청 헬퍼
 */
export async function apiPut<T = any>(
  endpoint: string,
  {
    body,
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(errorMessage || error.message, error.code);
  }

  return response.json();
}

/**
 * PATCH 요청 헬퍼
 */
export async function apiPatch<T = any>(
  endpoint: string,
  {
    body,
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(errorMessage || error.message, error.code);
  }

  return response.json();
}

/**
 * DELETE 요청 헬퍼
 */
export async function apiDelete<T = any>(
  endpoint: string,
  {
    body,
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(errorMessage || error.message, error.code);
  }

  return response.json();
}

/**
 * FormData 전송용 POST 요청 헬퍼
 */
export async function apiPostFormData<T = any>(
  endpoint: string,
  formData: FormData,
  {
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'POST',
      body: formData,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(errorMessage || error.message, error.code);
  }

  return response.json();
}

/**
 * FormData 전송용 PUT 요청 헬퍼
 */
export async function apiPutFormData<T = any>(
  endpoint: string,
  formData: FormData,
  {
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'PUT',
      body: formData,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(errorMessage || error.message, error.code);
  }

  return response.json();
}
