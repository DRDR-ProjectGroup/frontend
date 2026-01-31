'use client';

import Button from '@/components/ui/Button';
import InputText from '@/components/ui/InputText';
import { signupAction } from '../../../actions/auth/signup.actions';
import {
  sendEmailAction,
  verifyCodeAction,
} from '../../../actions/auth/email.actions';
import { useActionState, useEffect, useState, useTransition } from 'react';

export default function SignupForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    username: '',
    nickname: '',
    password: '',
    password2: '',
  });
  const [code, setCode] = useState('');

  // 이메일 인증 상태
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [codeMessage, setCodeMessage] = useState('');

  // useTransition으로 서버 액션 호출 시 pending 상태 관리
  const [isSendingEmail, startSendingEmail] = useTransition();
  const [isVerifyingCode, startVerifyingCode] = useTransition();

  const [state, action, pending] = useActionState(signupAction, null);

  return (
    <form className="space-y-5" action={action}>
      <div>
        <div className="flex gap-x-2">
          <InputText
            name="email"
            placeholder="Email (naver 메일만 이용 가능)"
            className="flex-1"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            readOnly={isEmailVerified}
          />
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setEmailMessage('');
              startSendingEmail(async () => {
                const result = await sendEmailAction(formValues.email);
                setEmailMessage(result.message);
                if (result.ok) {
                  setIsEmailSent(true);
                }
              });
            }}
            disabled={isSendingEmail || isEmailVerified}
          >
            {isSendingEmail
              ? 'Sending...'
              : isEmailSent
                ? 'Resend'
                : 'Send Code'}
          </Button>
        </div>
        {emailMessage && (
          <p
            className={`text-sm mt-1 ${isEmailSent ? 'text-green-500' : 'text-primitive-red'}`}
          >
            {emailMessage}
          </p>
        )}
      </div>

      {/* 이메일 발송 성공 시에만 인증번호 입력 필드 노출 */}
      {isEmailSent && !isEmailVerified && (
        <div>
          <div className="flex gap-x-2">
            <InputText
              name="code"
              placeholder="인증번호 입력"
              className="flex-1"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                setCodeMessage('');
                startVerifyingCode(async () => {
                  const result = await verifyCodeAction(formValues.email, code);
                  setCodeMessage(result.message);
                  if (result.ok) {
                    setIsEmailVerified(true);
                    setEmailMessage('이메일 인증이 완료되었습니다.');
                  }
                });
              }}
              disabled={isVerifyingCode}
            >
              {isVerifyingCode ? 'Verifying...' : 'Verify Code'}
            </Button>
          </div>
          {codeMessage && (
            <p
              className={`text-sm mt-1 ${isEmailVerified ? 'text-green-500' : 'text-primitive-red'}`}
            >
              {codeMessage}
            </p>
          )}
        </div>
      )}

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
      <Button
        type="submit"
        variant="secondary"
        className="h-[46px] w-full"
        disabled={pending || !isEmailVerified}
      >
        Sign Up
      </Button>
      {state && !state.ok && (
        <div className="text-primitive-red text-sm p-2 text-center">
          {state.message}
        </div>
      )}
    </form>
  );
}
