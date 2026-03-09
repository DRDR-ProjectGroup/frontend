import { cookies } from 'next/headers';

// 토큰 재발급 API 호출
export async function refreshAccessToken(): Promise<string | null> {
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

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message ?? '토큰 재발급 실패');
    }

    // 응답 헤더에서 새 액세스 토큰 추출
    const authHeader = res.headers.get('Authorization');
    if (!authHeader) throw new Error('Authorization 헤더 없음');

    const newToken = authHeader.replace('Bearer ', '');
    return newToken;
  } catch (error) {
    console.log('reissue failed: ', error);
    throw error;
  }
}
