import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteModal from '@/components/common/modal/DeleteModal';
import { deletePostAction } from '@/actions/post/post.actions';
import { getErrorMessage } from '@/lib/error/api';
import { useQueryClient } from '@tanstack/react-query';

export default function Delete({ postId }: { postId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (isPending) return; // 이미 삭제 중일 때 중복 클릭 방지
    setIsPending(true);
    try {
      // 게시글 Next.js fetch cache 초기화
      await deletePostAction(postId);
      // (mypage 내 작성글/내 댓글  ) ReactQuery cache 초기화
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['myPage', 'posts'] }),
        queryClient.invalidateQueries({ queryKey: ['myPage', 'comments'] }),
      ]);

      setIsModalOpen(false);

      router.replace('/');
      router.refresh();
    } catch (error) {
      alert(getErrorMessage(error, '글 삭제에 실패하였습니다.'));
    } finally {
      setIsPending(false);
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
        disabled={isPending}
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
