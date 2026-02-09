'use client';

import { Heading } from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import { IoMdClose } from 'react-icons/io';
import { useMessageDetailQuery } from '@/query/message/useMessageQuery';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils/formatDate';

interface MessageDetailProps {
  isModal: boolean;
  messageId: string;
}

export default function MessageDetail({
  isModal,
  messageId,
}: MessageDetailProps) {
  const router = useRouter();
  const {
    data: messageDetailResponse,
    isLoading,
    isError,
  } = useMessageDetailQuery({
    messageId: Number(messageId),
  });
  if (isLoading) return <div>Loading...</div>;
  const messageDetail = messageDetailResponse?.data;
  if (!messageDetail || isError) {
    return <div>쪽지 상세 조회 실패</div>;
  }

  return (
    <div className={isModal ? 'w-full max-w-md mx-auto' : ''}>
      <header className="flex justify-between items-center border-b border-primitive-grayPrimary pb-4">
        <Heading level={1} className="text-lg">
          쪽지 상세
        </Heading>
        <Button variant="icon" size="sm" onClick={() => router.back()}>
          <IoMdClose className="w-5 h-5" />
        </Button>
      </header>
      <main>
        <div className="px-4 flex justify-between items-center py-4 border-b border-primitive-grayPrimary text-sm">
          <div className="flex items-center gap-2">
            <span className="text-text-third">보낸이: </span>
            <span className="text-text-primary font-bold">
              {messageDetail.sender.nickname}
            </span>
          </div>
          <span className="text-text-third">
            {formatDate(messageDetail.createdAt)}
          </span>
        </div>
        <div className="p-4 whitespace-pre-wrap text-sm max-h-[300px] overflow-y-auto">
          {messageDetail.content}
        </div>
      </main>
      <footer>
        <div className="flex justify-center gap-2 py-4 border-t border-primitive-grayPrimary">
          <Button variant="primary" onClick={() => router.back()}>
            확인
          </Button>
        </div>
      </footer>
    </div>
  );
}
