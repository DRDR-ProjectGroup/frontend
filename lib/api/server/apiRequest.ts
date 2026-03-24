import { cookies } from 'next/headers';
import { reissueAccessToken } from './auth/auth';

export async function apiRequest(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const buildHeaders = async (): Promise<HeadersInit> => {
    const cookieStore = await cookies();
    return {
      ...options.headers,
      Cookie: cookieStore.toString(),
    };
  };

  const headers = await buildHeaders();

  let response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    await reissueAccessToken();
    const retryHeaders = await buildHeaders();

    response = await fetch(url, {
      ...options,
      headers: retryHeaders,
    });
  }

  return response;
}
