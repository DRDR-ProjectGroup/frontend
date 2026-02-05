'use client';

import Nav from './NavMenu';
import { redirect, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuthStore();
  const pathname = usePathname();

  // render 중 side effect를 피하기 위해 로그인 상태 변경 시 effect에서 redirect
  useEffect(() => {
    if (!isLoggedIn) {
      redirect('/login');
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Nav currentPath={pathname} />
      <div className="py-8">{children}</div>
    </div>
  );
}
