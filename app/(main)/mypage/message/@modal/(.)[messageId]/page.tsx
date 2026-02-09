'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/common/modal/Modal';
import { useParams } from 'next/navigation';
import MessageDetail from '../../MessageDetail';

export default function Page() {
  const router = useRouter();
  const params = useParams<{ messageId: string }>();

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <MessageDetail isModal={true} messageId={params.messageId} />
    </Modal>
  );
}
