'use client';

import Nav from './NavMenu';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isInitialized, isLoggedIn } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      router.push('/login');
    }
  }, [isInitialized, isLoggedIn, router]);

  if (!isInitialized || !isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav currentPath={pathname} />
      <div className="py-4">{children}</div>
    </div>
  );
}
