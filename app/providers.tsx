 'use client';
 
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 import { ReactNode, useState } from 'react';
 
 export default function Providers({ children }: { children: ReactNode }) {
   // 렌더마다 새 QueryClient가 만들어지지 않도록 고정
   const [queryClient] = useState(() => new QueryClient());
 
   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
 }
 
