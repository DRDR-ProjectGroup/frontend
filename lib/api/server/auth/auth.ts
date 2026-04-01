import { cookies } from 'next/headers';
import { ApiError } from '@/lib/error/api';

interface ReissueAccessTokenResult {
  cookieHeader: string;
}

// reissue 응답에서 Set-Cookie 헤더 목록을 추출한다.
// 런타임에 getSetCookie 지원 여부가 달라 fallback 분기를 함께 처리한다.
function getSetCookieHeaders(response: Response): string[] {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  };

  if (typeof headers.getSetCookie === 'function') {
    return headers.getSetCookie();
  }

  const setCookieHeader = response.headers.get('set-cookie');
  return setCookieHeader ? setCookieHeader.split(/,(?=\s*[^;,\s]+=)/) : [];
}

// Set-Cookie 문자열에서 "name=value"를 파싱하고,
// 쿠키 삭제 의도(Max-Age=0 또는 epoch Expires) 여부를 판별한다.
function parseCookieNameValue(setCookieHeader: string): {
  name: string;
  value: string;
  shouldDelete: boolean;
} | null {
  const firstPart = setCookieHeader.split(';')[0]?.trim();
  if (!firstPart) {
    return null;
  }

  const separatorIndex = firstPart.indexOf('=');
  if (separatorIndex === -1) {
    return null;
  }

  const name = firstPart.slice(0, separatorIndex).trim();
  const value = firstPart.slice(separatorIndex + 1).trim();
  if (!name) {
    return null;
  }

  const lower = setCookieHeader.toLowerCase();
  const shouldDelete =
    /max-age\s*=\s*0/.test(lower) ||
    /expires\s*=\s*thu,\s*01\s*jan\s*1970/i.test(setCookieHeader);

  return { name, value, shouldDelete };
}

// refreshToken 기반으로 토큰 재발급 API를 호출한다.
// 성공 시 Set-Cookie를 현재 쿠키 상태에 병합해 재시도용 Cookie 헤더 문자열을 반환한다.
export async function reissueAccessToken(): Promise<ReissueAccessTokenResult> {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.BACKEND_API_BASE_URL}/auth/reissue`,
      {
        method: 'POST',
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: 'no-store',
      },
    );

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new ApiError(result.message ?? '토큰 재발급 실패', result.code ?? 401);
    }

    const setCookieHeaders = getSetCookieHeaders(res);
    const cookieMap = new Map(
      cookieStore.getAll().map((cookie) => [cookie.name, cookie.value]),
    );

    for (const setCookieHeader of setCookieHeaders) {
      const parsed = parseCookieNameValue(setCookieHeader);
      if (!parsed) {
        continue;
      }

      if (parsed.shouldDelete) {
        cookieMap.delete(parsed.name);
        try {
          cookieStore.delete(parsed.name);
        } catch {
          // Server Component 컨텍스트에서는 쓰기 제한 가능
        }
        continue;
      }

      cookieMap.set(parsed.name, parsed.value);
      try {
        cookieStore.set(parsed.name, parsed.value);
      } catch {
        // Server Component 컨텍스트에서는 쓰기 제한 가능
      }
    }

    return {
      cookieHeader: Array.from(cookieMap.entries())
        .map(([name, value]) => `${name}=${value}`)
        .join('; '),
    };
  } catch (error) {
    console.log('reissue failed: ', error);
    throw error;
  }
}
