'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

export default function Providers({ children }: { children: ReactNode }) {
  // 렌더마다 새 QueryClient가 만들어지지 않도록 고정
  const [queryClient] = useState(() => new QueryClient());
  
  // 인증 상태 초기화
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    // 앱 최초 로드 시 인증 상태 초기화
    initAuth();
  }, [initAuth]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
 
