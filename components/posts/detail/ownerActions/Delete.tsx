import Button from '@/components/ui/Button';
import { useDeletePostMutation } from '@/query/post/usePostMutations';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteModal from '@/components/common/modal/DeleteModal';

export default function Delete({ postId }: { postId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { mutate: deletePostMutation } = useDeletePostMutation();

  const handleDelete = () => {
    console.log(postId, ' postId in PostOwnerActions');
    deletePostMutation(postId, {
      onSuccess: () => {
        router.push('/');
      },
      onError: (error) => {
        alert('글 삭제에 실패하였습니다.');
        console.error(error);
      },
    });
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
