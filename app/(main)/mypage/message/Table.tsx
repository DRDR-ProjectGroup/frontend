import Link from 'next/link';
import { formatDate } from '@/lib/utils/formatDate';
import { MessageItem } from '@/types/api/message';
import Button from '@/components/ui/Button';
import { GoTrash } from 'react-icons/go';
import { useCallback, useState } from 'react';
import DeleteModal from '@/components/common/modal/DeleteModal';
import { useDeleteMessageMutation } from '@/query/message/useMessageMutations';

interface MessageTableProps {
  messages: MessageItem[];
  type: 'inbox' | 'sent';
  page: number;
}

export default function MessageTable({
  messages,
  type,
  page,
}: MessageTableProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null,
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { mutate: deleteMessageMutation } = useDeleteMessageMutation();

  const handleDelete = (messageId: number | null) => {
    if (messageId === null) return;
    deleteMessageMutation(
      { messageId },
      {
        onSuccess: () => {
          setIsOpenDeleteModal(false);
          alert('쪽지 삭제 성공');
        },
        onError: () => {
          alert('쪽지 삭제 실패');
        },
      },
    );
  };

  return (
    <>
      <table className="table-fixed w-full border-collapse text-center ">
        <caption className="sr-only">내 작성글 목록</caption>
        <colgroup>
          <col className="w-[120px]" />
          <col />
          <col className="w-[140px]" />
          <col className="w-[60px]" />
        </colgroup>
        <thead className="bg-primitive-grayWeakest/80 h-[40px] text-xs text-text-second font-bold">
          <tr className="border-b border-primitive-graySecond">
            <th className="px-4">보낸이</th>
            <th className="px-4 text-left">내용</th>
            <th className="px-4">날짜</th>
            <th>
              <span className="sr-only">삭제</span>
            </th>
          </tr>
        </thead>
        <tbody className="h-[50px] text-sm">
          {messages.map((message: MessageItem) => (
            <tr
              key={message.messageId}
              className="border-b border-primitive-graySecond hover:bg-primitive-grayThird"
            >
              <td className="px-4 py-3">{message.sender.nickname}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2 items-center">
                  <Link
                    href={`/mypage/message/${message.messageId}?type=${type}&page=${page}`}
                    className="truncate max-w-[calc(100%-16px)] font-bold hover:underline text-left"
                  >
                    {message.content}
                  </Link>
                </div>
              </td>
              <td className="px-4 py-3 text-text-third">
                {formatDate(message.createdAt)}
              </td>
              <td className=" py-3">
                <Button
                  variant="icon"
                  size="sm"
                  onClick={() => {
                    setIsOpenDeleteModal(true);
                    setSelectedMessageId(message.messageId);
                  }}
                >
                  <GoTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpenDeleteModal && (
        <DeleteModal
          title="쪽지 삭제"
          message="쪽지를 삭제하시겠습니까?"
          isOpen={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          onDelete={() => handleDelete(selectedMessageId)}
        />
      )}
    </>
  );
}
