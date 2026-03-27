import Button from '@/components/ui/Button';
import { useState } from 'react';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { createNoticeAction } from '@/actions/post/post.actions';
import { getErrorMessage } from '@/lib/error/api';
import { useRouter } from 'next/navigation';

interface NoticeProps {
  postId: number;
  isNotice: boolean;
}

export default function Notice({ postId, isNotice }: NoticeProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostNotice = async () => {
    try {
      const data = await createNoticeAction(postId);
      console.log(data.message || '공지 등록 성공');
      router.refresh();
    } catch (error) {
      alert(getErrorMessage(error, '공지 등록 실패'));
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant={isNotice ? 'secondary' : 'tertiary'}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {isNotice ? '공지 해제' : '공지 등록'}
      </Button>
      <ConfirmModal
        title={isNotice ? '공지 해제' : '공지 등록'}
        message={
          isNotice
            ? '해당 게시글을 공지에서 해제하시겠습니까?'
            : '해당 게시글을 공지로 등록하시겠습니까?'
        }
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handlePostNotice}
      />
    </>
  );
}
