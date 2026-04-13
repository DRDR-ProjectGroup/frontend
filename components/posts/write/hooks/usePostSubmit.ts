import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createPostAction,
  updatePostAction,
} from '@/actions/post/post.actions';
import { useQueryClient } from '@tanstack/react-query';

type SubmitPostParams = {
  mode: 'create' | 'edit';
  postId?: number;
  formData: FormData;
  category: string;
};

type UsePostSubmitOptions = {
  clearMedia: () => void;
};

export function usePostSubmit({ clearMedia }: UsePostSubmitOptions) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const queryClient = useQueryClient();

  const syncCachesAndNavigate = async (targetPostId: number | string) => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['myPage', 'posts'] }),
      queryClient.invalidateQueries({ queryKey: ['myPage', 'comments'] }),
    ]);
    router.refresh();
    router.push(`/posts/${targetPostId}`);
  };

  const submitPost = async ({
    mode,
    postId,
    formData,
    category,
  }: SubmitPostParams) => {
    setIsPending(true);
    setIsSuccess(false);

    if (mode === 'create') {
      try {
        const response = await createPostAction(formData, category);
        if (response.code !== 201 || !response.data?.postId) {
          throw new Error('createPostAction failed');
        }
        clearMedia();
        setIsSuccess(true);
        await syncCachesAndNavigate(response.data.postId);
      } catch (error) {
        setIsSuccess(false);
        alert('글 작성 실패!');
        throw error;
      } finally {
        setIsPending(false);
      }
      return;
    }

    if (!postId) {
      setIsPending(false);
      alert('글 ID가 없습니다.');
      return;
    }

    try {
      await updatePostAction(postId, formData);
      clearMedia();
      setIsSuccess(true);
      await syncCachesAndNavigate(postId);
    } catch (error) {
      setIsSuccess(false);
      alert('글 수정 실패!');
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return {
    submitPost,
    isPending: isPending,
    isSuccess: isSuccess,
  };
}
