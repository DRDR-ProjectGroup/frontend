'use client';

import Button from '@/components/ui/Button';
import { usePostDetailQuery } from '@/query/post/usePostDetailQuery';
import { useLikePostMutation } from '@/query/post/usePostMutations';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useAuthStore } from '@/lib/store/authStore';

export default function PostReactions({ postId }: { postId: number }) {
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

  const isLiked = post.memberLikeType === 'LIKE';
  const isDisliked = post.memberLikeType === 'DISLIKE';

  return (
    <div className="flex items-stretch justify-center gap-2 py-8">
      <Button
        variant="tertiary"
        className={`hover:bg-primitive-green/30 ${isLiked ? 'bg-primitive-green text-primitive-white' : ''}`}
        onClick={() => {
          if (!isLoggedIn) {
            return alert('로그인 후 이용해주세요.');
          }
          likePostMutate({ postId, likeType: 'like' });
        }}
      >
        <AiOutlineLike />
        &nbsp;Like
      </Button>
      <span className="px-2 text-md flex items-center justify-center">
        {post.likeCount}
      </span>
      <Button
        variant="tertiary"
        className={`hover:bg-primitive-red/30 ${isDisliked ? 'bg-primitive-blackPrimary text-primitive-white' : ''}`}
        onClick={() => {
          if (!isLoggedIn) {
            return alert('로그인 후 이용해주세요.');
          }
          likePostMutate({ postId, likeType: 'dislike' });
        }}
      >
        <AiOutlineDislike />
        &nbsp;Dislike
      </Button>
    </div>
  );
}
