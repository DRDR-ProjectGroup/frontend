import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteModal from '@/components/common/modal/DeleteModal';
import { deletePostAction } from '@/actions/post/post.actions';
import { getErrorMessage } from '@/lib/error/api';

export default function Delete({ postId }: { postId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletePostAction(postId);
      router.replace('/');
      router.refresh();
    } catch (error) {
      alert(getErrorMessage(error, '글 삭제에 실패하였습니다.'));
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="warning"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        삭제
      </Button>
      <DeleteModal
        title="글 삭제"
        message={`게시글을 삭제하시겠습니까? \n삭제 시, 30일 동안 정보는 보관되며, 이후 완전히 삭제됩니다.`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
