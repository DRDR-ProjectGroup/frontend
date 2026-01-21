'use client';

import Button from '@/components/ui/Button';
import InputText from '@/components/ui/InputText';
import { loginAction } from '../../actions/auth/loginAction';
import { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const [state, action, pending] = useActionState(loginAction, null);

  // 로그인 성공 시 토큰 저장 후 리다이렉트
  useEffect(() => {
    if (state?.ok && state.accessToken) {
      // localStorage에 accessToken 저장
      localStorage.setItem('accessToken', state.accessToken);
      // 홈으로 리다이렉트
      router.push('/');
    }
  }, [state, router]);

  return (
    <form className="space-y-5" action={action}>
      <InputText
        name="username"
        placeholder="ID"
        value={formValues.username}
        onChange={(e) =>
          setFormValues({ ...formValues, username: e.target.value })
        }
      />
      <InputText
        type="password"
        name="password"
        placeholder="Password"
        value={formValues.password}
        onChange={(e) =>
          setFormValues({ ...formValues, password: e.target.value })
        }
      />
      <Button type="submit" variant="secondary" className="h-[46px] w-full"
        disabled={pending}
      >
        Login
      </Button>
      {state && !state.ok && (<div className="text-primitive-red text-sm p-2 text-center">
        {state.message}
      </div>)}
    </form>
  );
}
