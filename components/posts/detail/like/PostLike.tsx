'use client';

import Button from '@/components/ui/Button';
import { usePostDetailQuery } from '@/query/post/usePostDetailQuery';
import { useLikePostMutation } from '@/query/post/usePostMutations';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useAuthStore } from '@/lib/store/authStore';

export default function PostReactions({ postId }: { postId: string }) {
  const {
    data: postDetailResponse,
    isLoading,
    error,
  } = usePostDetailQuery(postId);
  const { mutate: likePostMutate } = useLikePostMutation();
  const { isLoggedIn } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const post = postDetailResponse?.data;
  if (!post) {
    return <div>게시글 상세 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="flex items-stretch justify-center gap-2 py-8">
      <Button
        variant="tertiary"
        className="hover:bg-primitive-green/30"
        onClick={() => {
          if (!isLoggedIn) {
            return alert('로그인 후 이용해주세요.');
          }
          likePostMutate({ postId, likeType: 'like' });
        }}
      >
        <AiOutlineLike />
        &nbsp;{post.likeCount}
      </Button>
      <Button
        variant="tertiary"
        className="hover:bg-primitive-red/30"
        onClick={() => {
          if (!isLoggedIn) {
            return alert('로그인 후 이용해주세요.');
          }
          likePostMutate({ postId, likeType: 'dislike' });
        }}
      >
        <AiOutlineDislike />
        &nbsp;
      </Button>
    </div>
  );
}
