'use client';

import type { ReactNode } from 'react';
import Main from './Main';
import Sidebar from './Sidebar';
import { BiCategory } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import type { NavMenu } from './types';

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

export default function AdminLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 flex">
      <Sidebar navMenus={navMenus} currentPath={pathname} />
      <Main navMenus={navMenus} currentPath={pathname}>
        {children}
      </Main>
    </div>
  );
}
