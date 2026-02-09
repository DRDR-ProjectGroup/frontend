'use client';

import { useEffect } from 'react';
import Main from './Main';
import Sidebar from './Sidebar';
import { BiCategory } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export interface NavMenu {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInitialized, isLoggedIn } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      router.push('/login');
    }
    // else if (role !== 'ADMIN') {
    //   router.push('/');
    // }
  }, [isInitialized, isLoggedIn]);

  const navMenus: NavMenu[] = [
    {
      name: '카테고리 관리',
      href: '/admin/category',
      icon: <BiCategory />,
    },
    {
      name: '회원 관리',
      href: '/admin/member',
      icon: <FiUser />,
    },
  ];

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 flex">
      {/* 사이드바 */}
      <Sidebar navMenus={navMenus} currentPath={pathname} />
      {/* 메인 */}
      <Main navMenus={navMenus} currentPath={pathname}>
        {children}
      </Main>
    </div>
  );
}
