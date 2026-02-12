'use client';

import Button from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';
import { useChangeNicknameMutation } from '@/query/mypage/useMyPageMutations';
import { useMyInfoQuery } from '@/query/mypage/useMyPageQuery';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [currentNickname, setCurrentNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');

  // 내 정보 조회
  const {
    data: memberInfo,
    isLoading: isMemberInfoLoading,
    isError: isMemberInfoError,
  } = useMyInfoQuery();

  // 닉네임 변경
  const {
    mutate: changeNickname,
    isPending: isChangeNicknamePending,
    isError: isChangeNicknameError,
  } = useChangeNicknameMutation();

  useEffect(() => {
    if (memberInfo?.data) {
      setCurrentNickname(memberInfo.data.nickname);
    }
  }, [memberInfo]);

  if (isMemberInfoLoading) return <div>로딩중...</div>;
  if (isMemberInfoError) return <div>에러가 발생했습니다.</div>;
  if (!isMemberInfoLoading && !memberInfo) return <div>데이터가 없습니다.</div>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNickname.trim() === '') {
      return alert('닉네임을 입력해주세요.');
    }
    changeNickname(
      { newNickname },
      {
        onSuccess: () => {
          console.log('닉네임 변경 성공');
          router.back();
        },
        onError: () => {
          console.log('닉네임 변경 실패');
        },
      },
    );
  };

  return (
    <div>
      <Heading level={2} className="mb-6">
        닉네임 수정
      </Heading>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="currentNickname"
              className="text-sm text-text-second"
            >
              현재 닉네임
            </label>
            <InputText
              id="currentNickname"
              readOnly
              className="mt-2"
              value={currentNickname}
              onChange={(e) => setCurrentNickname(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="newNickname"
              className="block text-sm font-medium text-text-second"
            >
              새 닉네임
            </label>
            <InputText
              id="newNickname"
              className="mt-2"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button type="submit" disabled={isChangeNicknamePending}>
            {isChangeNicknamePending ? '수정 중...' : '닉네임 수정'}
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
