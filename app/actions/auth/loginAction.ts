'use server';
import { redirect } from 'next/navigation';

type LoginAPIResult = {
  code: number;
  message: string;
}

type LoginActionResult = {
  ok: boolean;
  message: string;
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
    return { ok :false, message: '모든 필드를 채워주세요.' };
  }

  // 백엔드 호출
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
  
  redirect('/');
}
