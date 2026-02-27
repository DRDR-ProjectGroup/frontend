'use client';

import Button from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';
import { useResignMutation } from '@/query/mypage/useMyPageMutations';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import DeleteModal from '@/components/common/modal/DeleteModal';

export default function Page() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const { clearAuth } = useAuthStore();
  const { mutate: resign, isPending: isResignPending } = useResignMutation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.trim() === '') {
      return alert('비밀번호를 모두 입력해주세요.');
    }
    setIsOpenDeleteModal(true);
  };

  const handleDelete = () => {
    setIsOpenDeleteModal(false);
    resign(
      { password },
      {
        onSuccess: () => {
          alert('회원 탈퇴 성공');
          clearAuth();
          router.push('/');
        },
        onError: () => {
          alert('회원 탈퇴 실패');
        },
      },
    );
  };

  return (
    <div>
      <Heading level={2} className="mb-6">
        회원 탈퇴
      </Heading>
      <p className="text-sm text-text-third mb-6">
        회원 탈퇴 시, 30일 동안 정보는 보관되며, 이후 완전히 삭제됩니다.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-text-second"
            >
              비밀번호 입력
            </label>
            <InputText
              type="password"
              id="password"
              className="mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="warning" type="submit" disabled={isResignPending}>
            {isResignPending ? '탈퇴 중...' : '회원 탈퇴'}
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

      <DeleteModal
        title="회원 탈퇴"
        message="정말 회원 탈퇴를 진행하시겠습니까?"
        isOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        onDelete={handleDelete}
        className="max-w-sm"
      />
    </div>
  );
}
