import PostListWrap from '@/components/posts/list/PostListWrap';
import type { PostListSortType } from '@/types/api/postList';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryName: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const { categoryName } = await params;
  const { page, sort } = await searchParams;

  return (
    <PostListWrap
      category={categoryName}
      page={page ? Number(page) : undefined}
      sort={sort as PostListSortType | undefined}
    />
  );
}
