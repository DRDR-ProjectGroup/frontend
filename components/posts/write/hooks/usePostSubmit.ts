import { useState } from 'react';
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

  const submitPost = async ({
    mode,
    postId,
    formData,
    category,
  }: SubmitPostParams) => {
    if (mode === 'create') {
      try {
        setIsPending(true);
        const response = await createPostAction(formData, category);
        clearMedia();
        setIsSuccess(true);
        if (response.code === 201 && response.data?.postId) {
          router.refresh();
          router.push(`/posts/${response.data.postId}`);
        }
      } catch (error) {
        setIsPending(false);
        setIsSuccess(false);
        alert('글 작성 실패!');
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
      setIsSuccess(true);
      router.refresh();
      router.push(`/posts/${postId}`);
    } catch (error) {
      setIsPending(false);
      setIsSuccess(false);
      alert('글 수정 실패!');
      throw error;
    }
  };

  return {
    submitPost,
    isPending: isPending,
    isSuccess: isSuccess,
  };
}
