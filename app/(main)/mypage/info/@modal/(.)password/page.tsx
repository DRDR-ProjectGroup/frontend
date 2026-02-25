'use client';

import PasswordForm from '@/app/(main)/mypage/info/password/page';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/modal/Modal';

export default function Page() {
  const router = useRouter();

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <PasswordForm />
    </Modal>
  );
}
