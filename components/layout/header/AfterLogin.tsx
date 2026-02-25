'use client';

import Button from '@/components/ui/Button';
import LinkButton from '@/components/ui/LinkButton';
import { useLogoutMutation } from '@/query/auth/useAuthMutations';
import { useRouter } from 'next/navigation';
import { RiUser3Line, RiLogoutBoxLine } from 'react-icons/ri';
import { HiOutlinePencilAlt } from 'react-icons/hi';

export default function AfterLogin() {
  const router = useRouter();
  const { mutate: logoutMutation, isPending: isLoggingOut } =
    useLogoutMutation();

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        router.push('/');
      },
      onError: () => {
        alert('로그아웃에 실패했습니다.');
      },
    });
  };

  return (
    <div className="flex gap-1 items-center">
      <LinkButton href="/posts/write" variant="icon" title="글쓰기">
        <HiOutlinePencilAlt />
        <span className="sr-only">글쓰기</span>
      </LinkButton>
      <LinkButton href="/mypage/info" variant="icon" title="마이페이지">
        <RiUser3Line />
        <span className="sr-only">마이페이지</span>
      </LinkButton>
      <Button
        variant="icon"
        onClick={handleLogout}
        disabled={isLoggingOut}
        title="로그아웃"
      >
        <RiLogoutBoxLine />
        <span className="sr-only">로그아웃</span>
      </Button>
    </div>
  );
}
