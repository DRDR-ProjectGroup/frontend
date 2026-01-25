'use client';

import Button from '@/components/ui/Button';
import InputText from '@/components/ui/InputText';
import { loginAction } from '../../../actions/auth/login.actions';
import { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const [state, action, pending] = useActionState(loginAction, null);

  // 로그인 성공 시 Zustand store 업데이트 후 리다이렉트
  useEffect(() => {
    if (state?.ok && state.accessToken) {
      // Zustand store에 토큰 저장 (자동으로 localStorage에도 저장됨)
      setAuth(state.accessToken);
      
      // 홈으로 리다이렉트
      router.push('/');
    }
  }, [state, router, setAuth]);

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
