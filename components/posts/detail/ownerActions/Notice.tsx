import Button from '@/components/ui/Button';
import { useState } from 'react';
import { usePostNoticeMutation } from '@/query/admin/notice/useNoticeMutations';
import ConfirmModal from '@/components/common/modal/ConfirmModal';

export default function Notice({ postId }: { postId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: postNoticeMutation } = usePostNoticeMutation();

  const handlePostNotice = () => {
    postNoticeMutation(
      { postId: postId.toString() },
      {
        onSuccess: () => {
          alert('공지 등록 성공');
          setIsModalOpen(false);
        },
        onError: (error) => {
          alert('공지 등록에 실패하였습니다.');
          console.error(error);
        },
      },
    );
  };

  return (
    <>
      <Button
        size="sm"
        variant="tertiary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        공지 등록
      </Button>
      <ConfirmModal
        title="공지 등록"
        message="해당 게시글을 공지로 등록하시겠습니까?"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handlePostNotice}
      />
    </>
  );
}
