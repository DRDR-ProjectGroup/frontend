'use client';

import Dialog from '@/components/common/modal/Dialog';
import NicknameForm from '@/app/mypage/info/nickname/page';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <Dialog onCancel={() => router.back()}>
      <NicknameForm />
    </Dialog>
  );
}
