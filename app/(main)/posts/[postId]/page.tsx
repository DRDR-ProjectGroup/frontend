import { notFound } from 'next/navigation';
import Comments from '@/components/posts/detail/comment/Comments';
import PostMeta from '@/components/posts/detail/contents/PostMeta';
import PostReactions from '@/components/posts/detail/like/PostLike';
import PostListWrap from '@/components/posts/list/PostListWrap';
import type { PostListSortType } from '@/types/api/postList';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ postId: string }>;
  searchParams: Promise<{
    category?: string;
    page?: string;
    sort?: string;
    currentPostId?: string;
  }>;
}) {
  const { postId } = await params;
  const { category = 'all', page, sort, currentPostId } = await searchParams;

  // postId 검증: 양의 정수만 허용
  if (!/^\d+$/.test(postId)) {
    notFound();
  }
  const postIdNumber = Number(postId);

  return (
    <div>
      <div>
        {/* 게시글 메타 정보 */}
        <PostMeta postId={postIdNumber} />

        {/* 좋아요, 싫어요 */}
        <PostReactions postId={postIdNumber} />

        {/* 댓글 */}
        <Comments postId={postIdNumber} />
      </div>

      {/* 이전에 보던 카테고리와 페이지 상태를 유지한 글 리스트 */}
      {currentPostId && (
        <div className="mt-8">
          <PostListWrap
            category={category}
            page={page ? Number(page) : undefined}
            sort={sort as PostListSortType | undefined}
          />
        </div>
      )}
    </div>
  );
}
