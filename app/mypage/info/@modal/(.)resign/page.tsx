'use client';

import ResignForm from '@/app/mypage/info/resign/page';
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
