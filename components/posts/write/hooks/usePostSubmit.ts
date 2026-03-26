import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createPostAction,
  updatePostAction,
} from '@/actions/post/post.actions';

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

  const submitPost = useCallback(
    async ({ mode, postId, formData, category }: SubmitPostParams) => {
      if (mode === 'create') {
        try {
          setIsPending(true);
          const response = await createPostAction(formData, category);
          clearMedia();
          alert('글 작성 완료!');
          setIsSuccess(true);
          if (response.code === 201 && response.data?.postId) {
            router.push(`/posts/${response.data.postId}`);
          }
        } catch (error) {
          setIsPending(false);
          setIsSuccess(false);
          throw error;
        }
        return;
      }

      if (!postId) {
        alert('글 ID가 없습니다.');
        return;
      }

      try {
        setIsPending(true);
        await updatePostAction(postId, formData);
        clearMedia();
        alert('글 수정 완료!');
        router.push(`/posts/${postId}`);
      } catch (error) {
        setIsPending(false);
        setIsSuccess(false);
        throw error;
      }
    },
    [clearMedia, router],
  );

  return {
    submitPost,
    isPending: isPending,
    isSuccess: isSuccess,
  };
}
