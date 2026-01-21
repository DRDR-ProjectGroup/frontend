'use client';

import Button from '@/components/ui/Button';
import InputText from '@/components/ui/InputText';
import { loginAction } from '../../actions/auth/LoginAction';
import { useActionState, useState } from 'react';

export default function LoginForm() {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const [state, action, pending] = useActionState(loginAction, null);

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
