'use server';
import { redirect } from 'next/navigation';

type SignupAPIResult = {
  code: number;
  message: string;
}

type SignupActionResult = {
  ok: boolean;
  message: string;
};

export async function signupAction(
  _SignupActionResult: SignupActionResult | null,
  formData: FormData,
): Promise<SignupActionResult> {
  const email = formData.get('email')?.toString() || '';
  const username = formData.get('username')?.toString() || '';
  const nickname = formData.get('nickname')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const password2 = formData.get('password2')?.toString() || '';
  const allFormData = [email, username, nickname, password, password2];
  const nonEmpty = allFormData.every((field) => field.trim().length > 0);

  // 빈 값 체크
  if (!nonEmpty) {
    console.log('모든 필드를 채워주세요.');
    return { ok :false, message: '모든 필드를 채워주세요.' };
  }

  // 백엔드 호출
  const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/members/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      username,
      nickname,
      password,
      password2,
    }),
    cache: 'no-store',
  });

  const data: SignupAPIResult = await res.json();

  if (!res.ok) {
    return { ok: false, message: data.message };
  }
  
  redirect('/login');
}
