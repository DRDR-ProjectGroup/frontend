import Comments from '@/components/posts/detail/comment/Comments';
import PostMeta from '@/components/posts/detail/contents/PostMeta';
import PostLike from '@/components/posts/detail/like/PostLike';
import PostListWrap from '@/components/posts/list/PostListWrap';
import { fetchPostDetail } from '@/lib/api/post/post.server';
import type { PostListSortType } from '@/types/api/postList';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const postDetailResponse = await fetchPostDetail(Number(postId));

  if (!postDetailResponse.data || postDetailResponse.code !== 200) {
    notFound();
  }

  const post = postDetailResponse.data;

  const metadata = {
    title: post.title,
    description: post.title,
    openGraph: {
      title: post.title,
      description: post.title,
      images: post.mediaList?.map((m) => m.url) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.title,
      images: post.mediaList?.map((m) => m.url) || [],
    },
  };

  return metadata;
}

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
        <PostLike postId={postIdNumber} />

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
