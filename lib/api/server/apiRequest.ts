import { cookies } from 'next/headers';
import { reissueAccessToken } from './auth/auth';

export interface ApiRequestOptions extends RequestInit {
  withAuth?: boolean;
}

export async function apiRequest(
  url: string,
  options: ApiRequestOptions = {},
): Promise<Response> {
  const { withAuth = true, ...rest } = options;

  let headers: HeadersInit = {
    ...rest.headers,
  };

  // 인증 필수 fetch 요청 시 (cookie 사용) => 캐시 비활성화
  if (withAuth) {
    const cookieStore = await cookies();
    headers = {
      ...headers,
      Cookie: cookieStore.toString(),
    };
  }

  let response = await fetch(url, {
    ...rest,
    headers,
  });

  if (response.status === 401 && withAuth) {
    await reissueAccessToken();

    const cookieStore = await cookies();
    const retryHeaders = {
      ...headers,
      Cookie: cookieStore.toString(),
    };

    response = await fetch(url, {
      ...rest,
      headers: retryHeaders,
    });
  }

  return response;
}
