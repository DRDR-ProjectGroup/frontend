import Button from '@/components/ui/Button';
import { useState } from 'react';
import { usePostNoticeMutation } from '@/query/admin/notice/useNoticeMutations';
import ConfirmModal from '@/components/common/modal/ConfirmModal';

interface NoticeProps {
  postId: number;
  isNotice: boolean;
}

export default function Notice({ postId, isNotice }: NoticeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: postNoticeMutation } = usePostNoticeMutation();

  const handlePostNotice = () => {
    postNoticeMutation(
      { postId: postId.toString() },
      {
        onSuccess: () => {
          alert(isNotice ? '공지 해제 성공' : '공지 등록 성공');
          setIsModalOpen(false);
        },
        onError: (error) => {
          alert(
            isNotice
              ? '공지 해제에 실패하였습니다.'
              : '공지 등록에 실패하였습니다.',
          );
          console.error(error);
        },
      },
    );
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
