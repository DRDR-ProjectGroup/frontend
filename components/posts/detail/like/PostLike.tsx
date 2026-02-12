'use client';

import Button from '@/components/ui/Button';
import { useLikeMutation } from '@/query/like/useLikeMutations';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useAuthStore } from '@/lib/store/authStore';
import { useLikeQuery } from '@/query/like/useLikeQuery';

export default function PostLike({ postId }: { postId: number }) {
  const { data: likeResponse, isLoading, error } = useLikeQuery({ postId });
  const { mutate: likeMutation } = useLikeMutation();
  const { isLoggedIn } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const likeData = likeResponse?.data;
  if (!likeData) {
    return <div>게시글 상세 정보를 불러오지 못했습니다.</div>;
  }

  const isLiked = likeData.memberLikeType === 'LIKE';
  const isDisliked = likeData.memberLikeType === 'DISLIKE';

  return (
    <div className="flex items-stretch justify-center gap-2 py-8">
      <Button
        variant="tertiary"
        className={`hover:bg-primitive-green/30 ${isLiked ? 'bg-primitive-green text-primitive-white' : ''}`}
        onClick={() => {
          if (!isLoggedIn) {
            return alert('로그인 후 이용해주세요.');
          }
          likeMutation({ postId, likeType: 'like' });
        }}
      >
        <AiOutlineLike />
        &nbsp;Like
      </Button>
      <span className="px-2 text-md flex items-center justify-center">
        {likeData.likeCount}
      </span>
      <Button
        variant="tertiary"
        className={`hover:bg-primitive-red/30 ${isDisliked ? 'bg-primitive-blackPrimary text-primitive-white' : ''}`}
        onClick={() => {
          if (!isLoggedIn) {
            return alert('로그인 후 이용해주세요.');
          }
          likeMutation({ postId, likeType: 'dislike' });
        }}
      >
        <AiOutlineDislike />
        &nbsp;Dislike
      </Button>
    </div>
  );
}
