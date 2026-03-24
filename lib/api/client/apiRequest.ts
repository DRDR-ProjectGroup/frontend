import { RequireAuthOptions } from '@/types/api/auth';
import { reissueAccessToken } from './auth/auth';
import { useAuthStore } from '@/lib/store/authStore';

/**
 * API 요청 함수 (fetch wrapper)
 * - 쿠키 포함 (cross-origin 에러 방지)
 * - 401 에러 시 토큰 재발급 시도
 */
export async function apiRequest(
  url: string,
  options: RequestInit = {},
  requireAuthOptions?: RequireAuthOptions,
): Promise<Response> {
  // 요청 헤더 구성
  const headers: HeadersInit = {
    ...options.headers,
  };

  // 첫 번째 요청
  let response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // 쿠키 포함 (RefreshToken, AccessToken, GuestToken)
  });

  // 401 에러 처리 (access token 만료)
  if (response.status === 401) {
    console.log('access token 만료, refresh token 재발급 시도...');

    // access token 재발급 시도
    try {
      await reissueAccessToken();
      // 재발급 성공 -> 원래 요청 재시도
      const retryHeaders: HeadersInit = {
        ...options.headers,
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
      if (
        requireAuthOptions?.requireAuth &&
        requireAuthOptions?.replaceLoginPage
      ) {
        window.location.href = '/login';
      }
      throw error;
    }
  }

  return response;
}
