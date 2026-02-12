'use client';

import Button from '@/components/ui/Button';
import InputText from '@/components/ui/InputText';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLoginMutation } from '@/query/auth/useAuthMutations';
import { useAuthStore } from '@/lib/store/authStore';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';
  const {
    mutate: loginMutation,
    isPending: isLoginPending,
    error: loginError,
  } = useLoginMutation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const [isEmpty, setIsEmpty] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues.username === '' || formValues.password === '') {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);

    loginMutation(
      {
        username: formValues.username,
        password: formValues.password,
      },
      {
        onSuccess: (data) => {
          router.push(redirect);
          setAuth(data.accessToken); // Zustand store에 저장
        },
      },
    );
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
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
      <Button
        type="submit"
        variant="secondary"
        className="h-[46px] w-full"
        disabled={isLoginPending}
      >
        Login
      </Button>
      {isEmpty && (
        <div className="text-primitive-red text-sm p-2 text-center">
          아이디와 비밀번호를 입력해주세요.
        </div>
      )}
      {loginError && (
        <div className="text-primitive-red text-sm p-2 text-center">
          {loginError.message}
        </div>
      )}
    </form>
  );
}
