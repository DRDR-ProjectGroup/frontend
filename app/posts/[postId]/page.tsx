import { notFound } from 'next/navigation';
import Comments from '@/components/posts/detail/comment/Comments';
import PostMeta from '@/components/posts/detail/contents/PostMeta';
import PostReactions from '@/components/posts/detail/like/PostLike';

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  // postId 검증: 양의 정수만 허용
  if (!/^\d+$/.test(postId)) {
    notFound();
  }

  const postIdNumber = Number(postId);

  return (
    <div>
      {/* 게시글 메타 정보 */}
      <PostMeta postId={postIdNumber} />

      {/* 좋아요, 싫어요 */}
      <PostReactions postId={postIdNumber} />

      {/* 댓글 */}
      <Comments postId={postIdNumber} />
    </div>
  );
}
