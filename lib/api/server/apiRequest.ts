import { cookies } from 'next/headers';
import { reissueAccessToken } from './auth/auth';

type ApiRequestOptions = RequestInit & {
  withAuth?: boolean;
};

export async function apiRequest(
  url: string,
  options: ApiRequestOptions = {},
): Promise<Response> {
  const { withAuth = true, ...rest } = options;

  let headers: HeadersInit = {
    ...rest.headers,
  };

  // ✅ 인증 필요한 fetch 요청 시만 cookies 사용
  // Next.js에서 서버 fetch 내에 cookies 사용 시 => Next.js가 "이 요청은 사용자마다 결과가 달라질 수 있음" 라고 판단 => 캐시 비활성화
  // 👉 인증 필수 fetch 요청 시 => 캐시 포기
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
