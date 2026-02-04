'use client';

import PostWriteForm from '@/components/posts/write/PostWriteForm';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// 글 작성
export default function Page() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      router.push('/login?redirect=/posts/write');
    }
  }, [isInitialized, isLoggedIn, router]);

  if (!isInitialized || !isLoggedIn) {
    return <div>Loading...</div>;
  }

  return <PostWriteForm mode="create" />;
}
