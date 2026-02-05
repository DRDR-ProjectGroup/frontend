'use client';

import Dialog from '@/components/common/modal/Dialog';
import ResignForm from '@/app/mypage/info/resign/page';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <Dialog onCancel={() => router.back()}>
      <ResignForm />
    </Dialog>
  );
}
