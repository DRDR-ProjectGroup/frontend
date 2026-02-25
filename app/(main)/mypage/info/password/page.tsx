'use client';

import Button from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';
import { useChangePasswordMutation } from '@/query/mypage/useMyPageMutations';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  // 비밀번호  변경
  const { mutate: changePassword, isPending: isChangePasswordPending } =
    useChangePasswordMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      password.trim() === '' ||
      newPassword.trim() === '' ||
      newPassword2.trim() === ''
    ) {
      return alert('비밀번호를 모두 입력해주세요.');
    } else if (newPassword !== newPassword2) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
    changePassword(
      { password, newPassword, newPassword2 },
      {
        onSuccess: () => {
          alert('비밀번호 변경 성공');
          router.back();
        },
        onError: () => {
          alert('비밀번호 변경 실패');
        },
      },
    );
  };

  return (
    <div>
      <Heading level={2} className="mb-6">
        비밀번호 변경
      </Heading>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-text-second"
            >
              현재 비밀번호 입력
            </label>
            <InputText
              type="password"
              id="password"
              className="mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-text-second"
            >
              새 비밀번호 입력
            </label>
            <InputText
              type="password"
              id="newPassword"
              className="mt-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="newPassword2"
              className="block text-sm font-medium text-text-second"
            >
              새 비밀번호 입력 확인
            </label>
            <InputText
              type="password"
              id="newPassword2"
              className="mt-2"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button type="submit" disabled={isChangePasswordPending}>
            {isChangePasswordPending ? '수정 중...' : '비밀번호 수정'}
          </Button>
          <Button
            type="button"
            variant="tertiary"
            onClick={() => router.back()}
          >
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}
