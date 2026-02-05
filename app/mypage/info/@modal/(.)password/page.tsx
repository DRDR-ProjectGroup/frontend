'use client';

import Dialog from '@/components/common/modal/Dialog';
import PasswordForm from '@/app/mypage/info/password/page';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <Dialog onCancel={() => router.back()}>
      <PasswordForm />
    </Dialog>
  );
}
