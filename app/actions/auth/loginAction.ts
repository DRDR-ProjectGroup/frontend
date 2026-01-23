'use server';

type LoginAPIResult = {
  code: number;
  message: string;
}

type LoginActionResult = {
  ok: boolean;
  message: string;
  accessToken?: string;
};

export async function loginAction(
  _LoginActionResult: LoginActionResult | null,
  formData: FormData,
): Promise<LoginActionResult> {
  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const allFormData = [username, password];
  const nonEmpty = allFormData.every((field) => field.trim().length > 0);

  // 빈 값 체크
  if (!nonEmpty) {
    console.log('모든 필드를 채워주세요.');
    return { ok: false, message: '모든 필드를 채워주세요.' };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/members/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
      cache: 'no-store',
    });

    const data: LoginAPIResult = await res.json();

    if (!res.ok) {
      return { ok: false, message: data.message };
    }

    // 로그인 성공 - Authorization header에서 accessToken 추출
    const authHeader = res.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { ok: false, message: '토큰을 받지 못했습니다.' };
    }

    const accessToken = authHeader.replace('Bearer ', '');

    // refreshToken은 백엔드에서 httpOnly cookie로 설정해주므로 따로 처리 불필요
    // (단, fetch에 credentials: 'include' 옵션이 필요할 수 있음)

    return { ok: true, message: '로그인 성공', accessToken };

  } catch (error) {
    return { ok: false, message: '로그인 중 오류가 발생했습니다.' };
  }
}
