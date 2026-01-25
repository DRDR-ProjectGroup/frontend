'use client';

import Button from '@/components/ui/Button';
import LinkButton from '@/components/ui/LinkButton';
import { useAuthStore } from '@/lib/store/authStore';
import { logoutAction } from '@/actions/auth/logout.actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function AfterLogin() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // 백엔드 로그아웃 API 호출
      const result = await logoutAction();
      if(!result.ok) {
        alert(result.message + ', 로그아웃에 실패했습니다.');
      }
      router.push('/');
    } 
    catch (error) {
      console.error('로그아웃 실패:', error);
      router.push('/login');
    } 
    finally {
      clearAuth();
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <LinkButton href="/posts/write" variant="primary">
        글쓰기
      </LinkButton>
      <LinkButton href="/mypage" variant="tertiary">
        마이페이지
      </LinkButton>
      <Button 
        variant="secondary" 
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
      </Button>
    </div>
  );
}