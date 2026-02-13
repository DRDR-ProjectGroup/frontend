'use client';

import {
  useRouter,
  useSearchParams,
  useParams,
  notFound,
} from 'next/navigation';
import Modal from '@/components/common/modal/Modal';
import MessageDetail from '../../MessageDetail';

export default function Page() {
  const router = useRouter();
  const params = useParams<{ messageId: string }>();
  const searchParams = useSearchParams();
  const boxType = searchParams.get('type') as 'inbox' | 'sent';

  if (!params || !params.messageId || !boxType) {
    notFound();
  }

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <MessageDetail
        isModal={true}
        messageId={params.messageId}
        boxType={boxType}
      />
    </Modal>
  );
}
