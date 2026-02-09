'use client';

import Logo from './Logo';
import NavMenu from './NavMenu';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';
import { useAuthStore } from '@/lib/store/authStore';
import { NavMenuData } from '@/types/api/navMenu';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderClientProps {
  navMenus: NavMenuData[];
}

export default function HeaderClient({ navMenus }: HeaderClientProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={twMerge(
        'fixed top-0 left-0 right-0 z-50 shadow-xs h-[65px]',
        scrolled && 'bg-primitive-green/90 shadow-none text-primitive-white',
      )}
    >
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
