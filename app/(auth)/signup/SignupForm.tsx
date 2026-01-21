'use client';

import Button from '@/components/ui/Button';
import InputText from '@/components/ui/InputText';
import { signupAction } from '../../actions/auth/signupAction';
import { useActionState, useState } from 'react';

export default function SignupForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    username: '',
    nickname: '',
    password: '',
    password2: '',
  });

  const [state, action, pending] = useActionState(signupAction, null);

  return (
    <form className="space-y-5" action={action}>
      <div className="flex gap-x-2">
        <InputText
          name="email"
          placeholder="Email (naver 메일만 이용 가능)"
          className="flex-1"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
        />
        <Button variant="secondary"
          onClick={() => {
            const email = formValues.email;
            if (email.includes('@naver.com')) {
              fetch(`${process.env.BACKEND_API_BASE_URL}/members/sendEmail`, {
                method: 'POST',
                body: JSON.stringify({ email }),
              });
            } else {
              alert('naver 메일만 이용 가능합니다.');
            }
          }}
        >Send Code</Button>
      </div>
      <InputText
        name="username"
        placeholder="Username (영어 or 숫자, 최소 4글자)"
        value={formValues.username}
        onChange={(e) =>
          setFormValues({ ...formValues, username: e.target.value })
        }
      />
      <InputText
        name="nickname"
        placeholder="Nickname (띄어쓰기 금지)"
        value={formValues.nickname}
        onChange={(e) =>
          setFormValues({ ...formValues, nickname: e.target.value })
        }
      />
      <InputText
        type="password"
        name="password"
        placeholder="password (최소 8글자, 특수문자 필수)"
        value={formValues.password}
        onChange={(e) =>
          setFormValues({ ...formValues, password: e.target.value })
        }
      />
      <InputText
        type="password"
        name="password2"
        placeholder="password2 (비밀번호 확인)"
        value={formValues.password2}
        onChange={(e) =>
          setFormValues({ ...formValues, password2: e.target.value })
        }
      />
      <Button type="submit" variant="secondary" className="h-[46px] w-full"
        disabled={pending}
      >
        Sign Up
      </Button>
      {state && !state.ok && (<div className="text-primitive-red text-sm p-2 text-center">
        {state.message}
      </div>)}
    </form>
  );
}
