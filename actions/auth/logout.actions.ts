'use server';

type LogoutAPIResult = {
  code: number;
  message: string;
}

type LogoutActionResult = {
  ok: boolean;
  message: string;
};

export async function logoutAction(): Promise<LogoutActionResult> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/members/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      cache: 'no-store',
    });

    const data: LogoutAPIResult = await res.json();

    if (!res.ok) {
      return { ok: false, message: data.message };
    }

    return { ok: true, message: '로그아웃 성공' };

  } catch (error) {
    return { ok: false, message: '로그아웃 중 오류가 발생했습니다.' };
  }
}
