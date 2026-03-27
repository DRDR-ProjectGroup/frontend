import PostListWrap from '@/components/posts/list/PostListWrap';
import { fetchPostList } from '@/lib/api/server/post/post';
import { getPostListParams } from '@/lib/utils/getPostListParams';
import type {
  PostListSearchTargetType,
  PostListSortType,
} from '@/types/api/postList';
import { notFound } from 'next/navigation';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryName: string }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    searchMode?: boolean;
    searchTarget?: string;
    searchKeyword?: string;
  }>;
}) {
  const { categoryName } = await params;
  const { page, sort, searchMode, searchTarget, searchKeyword } =
    await searchParams;

  const postListParamsQuery = {
    category: categoryName,
    page: page ? Number(page) : undefined,
    sort: sort as PostListSortType | undefined,
    searchMode: searchMode || false,
    searchTarget: searchTarget as PostListSearchTargetType | 'ALL',
    searchKeyword: searchKeyword as string | '',
  };

  const postListParams = getPostListParams(postListParamsQuery);
  const postListResponse = await fetchPostList(postListParams);
  if (!postListResponse.data || postListResponse.code !== 200) {
    notFound();
  }
  const postListData = postListResponse.data;

  return (
    <PostListWrap postListParams={postListParams} postListData={postListData} />
  );
}
