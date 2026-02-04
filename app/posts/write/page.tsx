'use client';

import PostWriteForm from '@/components/posts/write/PostWriteForm';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

// 글 작성
export default function Page() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  if (!isLoggedIn) {
    router.push('/login');
    return null;
  }
  return <PostWriteForm mode="create" />;
}
