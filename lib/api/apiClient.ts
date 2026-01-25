/**
 * API 클라이언트 (fetch 인스턴스 대용)
 * - 자동으로 Authorization 헤더 추가
 * - 401 에러 시 자동으로 토큰 재발급 시도
 * - 재발급 실패 시 로그아웃 처리
 */

import { getAccessToken, setAccessToken, removeAccessToken } from '@/lib/utils/auth-token';

/**
 * 환경변수에서 API Base URL 가져오기
 */
function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_BACKEND_API_BASE_URL is not set');
  }
  return url.replace(/\/$/, '');
}

/**
 * 토큰 재발급 API 호출
 */
async function refreshAccessToken(): Promise<string | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/auth/reissue`, {
      method: 'POST',
      credentials: 'include', // 쿠키의 refreshToken 포함
    });

    if (!res.ok) {
      return null;
    }

    // 응답 헤더에서 새 액세스 토큰 추출
    const authHeader = res.headers.get('Authorization');
    if (!authHeader) return null;

    const newToken = authHeader.replace('Bearer ', '');
    setAccessToken(newToken);
    return newToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}

/**
 * API 요청 함수 (fetch wrapper)
 * - 자동으로 Authorization 헤더 추가
 * - 401 에러 시 토큰 재발급 시도
 */
export async function apiRequest(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAccessToken();

  // 요청 헤더 구성
  const headers: HeadersInit = {
    ...options.headers,
  };

  // 토큰이 있으면 Authorization 헤더 추가
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 첫 번째 요청
  let response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // 쿠키 포함 (refreshToken)
  });

  // 401 에러 처리 (토큰 만료)
  if (response.status === 401) {
    console.log('Token expired, attempting to refresh...');
    
    // 토큰 재발급 시도
    const newToken = await refreshAccessToken();

    if (newToken) {
      // 재발급 성공 -> 원래 요청 재시도
      console.log('Token refreshed successfully, retrying request...');
      headers['Authorization'] = `Bearer ${newToken}`;
      
      response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });
    } else {
      // 재발급 실패 -> 로그아웃 처리
      console.error('Token refresh failed, logging out...');
      removeAccessToken();
      
      // 로그인 페이지로 리다이렉트 (클라이언트 사이드에서만)
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }
  }

  return response;
}

/**
 * GET 요청 헬퍼
 */
export async function apiGet<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

/**
 * POST 요청 헬퍼
 */
export async function apiPost<T = any>(
  endpoint: string,
  body?: any,
  options?: RequestInit
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

/**
 * PUT 요청 헬퍼
 */
export async function apiPut<T = any>(
  endpoint: string,
  body?: any,
  options?: RequestInit
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

/**
 * DELETE 요청 헬퍼
 */
export async function apiDelete<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

/**
 * FormData 전송용 POST 요청 헬퍼
 */
export async function apiPostFormData<T = any>(
  endpoint: string,
  formData: FormData,
  options?: RequestInit
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const token = getAccessToken();

  const headers: HeadersInit = {
    ...options?.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

/**
 * FormData 전송용 PUT 요청 헬퍼
 */
export async function apiPutFormData<T = any>(
  endpoint: string,
  formData: FormData,
  options?: RequestInit
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const token = getAccessToken();

  const headers: HeadersInit = {
    ...options?.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'PUT',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}
