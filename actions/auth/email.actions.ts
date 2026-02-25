'use server';

type EmailAPIResult = {
  code: number;
  message: string;
};

type EmailActionResult = {
  ok: boolean;
  message: string;
};

// 이메일 인증 코드 발송
export async function sendEmailAction(email: string): Promise<EmailActionResult> {
  // 빈 값 체크
  if (!email || email.trim().length === 0) {
    return { ok: false, message: '이메일을 입력해주세요.' };
  }

  // 네이버 메일 체크
  if (!email.endsWith('@naver.com')) {
    return { ok: false, message: 'naver 메일만 사용 가능합니다.' };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/members/sendEmail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      cache: 'no-store',
    });

    const data: EmailAPIResult = await res.json();

    console.log(data);

    if (!res.ok) {
      return { ok: false, message: data.message };
    }
    return { ok: true, message: data.message };
  } catch (error) {
    return { ok: false, message: '이메일 전송 중 오류가 발생했습니다.' };
  }
}

// 인증번호 확인
export async function verifyCodeAction(
  email: string,
  code: string
): Promise<EmailActionResult> {
  // 빈 값 체크
  if (!code || code.trim().length === 0) {
    return { ok: false, message: '인증번호를 입력해주세요.' };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/members/verifyEmail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
      cache: 'no-store',
    });

    const data: EmailAPIResult = await res.json();

    if (!res.ok) {
      return { ok: false, message: data.message };
    }

    return { ok: true, message: data.message };
  } catch (error) {
    return { ok: false, message: '인증번호 확인 중 오류가 발생했습니다.' };
  }
}
