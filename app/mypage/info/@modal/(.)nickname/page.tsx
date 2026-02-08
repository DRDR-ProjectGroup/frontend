'use client';

import NicknameForm from '@/app/mypage/info/nickname/page';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/modal/Modal';

export default function Page() {
  const router = useRouter();

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <NicknameForm />
    </Modal>
  );
}
