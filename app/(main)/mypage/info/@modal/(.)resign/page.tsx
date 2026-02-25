'use client';

import ResignForm from '@/app/(main)/mypage/info/resign/page';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/modal/Modal';

export default function Page() {
  const router = useRouter();

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <ResignForm />
    </Modal>
  );
}
