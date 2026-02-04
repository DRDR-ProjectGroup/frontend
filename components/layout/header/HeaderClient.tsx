'use client';

import Logo from './Logo';
import NavMenu from './NavMenu';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';
import { useAuthStore } from '@/lib/store/authStore';
import { NavMenuData } from '@/types/api/navMenu';

interface HeaderClientProps {
  navMenus: NavMenuData[];
}

export default function HeaderClient({ navMenus }: HeaderClientProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <header className="shadow-xs h-[65px]">
      <div className="max-w-layout mx-auto h-full flex items-center px-6">
        <Logo />
        <div className="ml-8">
          <NavMenu navMenus={navMenus} />
        </div>
        <div className="ml-auto flex gap-2">
          {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
        </div>
      </div>
    </header>
  );
}
