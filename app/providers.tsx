'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

// ReactQuery Provider
export default function Providers({ children }: { children: ReactNode }) {
  // 렌더마다 새 QueryClient가 만들어지지 않도록 고정
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // 전역 설정
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // 포커스 시 refetch 비활성화
            refetchOnMount: true, // 마운트 시는 유지 (페이지 재방문 시 최신화)
            staleTime: 1000 * 60 * 1, // 1분
            retry: 1, // 실패 시 재시도 횟수
          },
        },
      }),
  );

  // 인증 상태 초기화
  const initAuth = useAuthStore((state) => state.initAuth);

  // 인증 상태 초기화 여부
  const [isAuthReady, setIsAuthReady] = useState(false);

  const didInitRef = useRef(false);

  useEffect(() => {
    if (didInitRef.current) return; // 이미 실행했으면 바로 return
    didInitRef.current = true;

    const init = async () => {
      await initAuth();
      setIsAuthReady(true);
    };
    init();
  }, []); // 빈 배열 = 마운트 시 한 번만 실행

  if (!isAuthReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
