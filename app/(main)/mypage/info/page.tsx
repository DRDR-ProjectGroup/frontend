'use client';

import LinkButton from '@/components/ui/LinkButton';
import { useMyInfoQuery } from '@/query/mypage/useMyPageQuery';
import { useAuthStore } from '@/lib/store/authStore';

export default function Page() {
  const role = useAuthStore((state) => state.role);
  const { data: memberInfo, isLoading, isError } = useMyInfoQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  if (!memberInfo?.data) return <div>데이터가 없습니다.</div>;

  const labelList = [
    { label: '아이디', value: memberInfo.data.username },
    { label: '닉네임', value: memberInfo.data.nickname },
    { label: '이메일', value: memberInfo.data.email },
    // { label: '권한', value: role },
  ];

  return (
    <div>
      <table className="w-full">
        <tbody>
          {labelList.map((label) => (
            <tr
              key={label.label}
              className="border-b border-primitive-graySecond text-sm"
            >
              <th className="text-left w-[155px] p-3">{label.label}</th>
              <td className="text-left p-3">{label.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 mt-8">
        <LinkButton variant="tertiary" href="/mypage/info/nickname">
          닉네임 수정
        </LinkButton>
        <LinkButton variant="tertiary" href="/mypage/info/password">
          비밀번호 변경
        </LinkButton>
        <LinkButton variant="secondary" href="/mypage/info/resign">
          회원 탈퇴
        </LinkButton>
      </div>
    </div>
  );
}
