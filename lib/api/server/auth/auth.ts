import { cookies } from 'next/headers';
import { ApiError } from '@/lib/error/api';

// 토큰 재발급 API 호출
export async function reissueAccessToken(): Promise<void> {
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
      throw new ApiError(result.message ?? '토큰 재발급 실패', result.code ?? 401);
    }
  } catch (error) {
    console.log('reissue failed: ', error);
    throw error;
  }
}
