'use client';

import PostList from './PostList';
import PostSearch from './PostSearch';
import PostListPagination from './PostListPagination';
import { PostListParamsProvider } from './PostListParamsContext';
import type {
  PostListParams,
  PostListSearchTargetType,
  PostListSortType,
} from '@/types/api/postList';
import { useSearchParams } from 'next/navigation';
import { usePostListQuery } from '@/query/post/usePostListQuery';

interface PostListWrapProps extends PostListParams {}

export default function PostListWrap({ category = 'all' }: PostListWrapProps) {
  const searchParams = useSearchParams();
  const searchMode = searchParams.get('searchMode') === 'true';
  const categoryValue = (searchParams.get('category') as string) || category;
  const searchTarget =
    (searchParams.get('searchTarget') as PostListSearchTargetType) || 'ALL';
  const searchKeyword = searchParams.get('searchKeyword') || '';
  const page = Math.max(1, Number(searchParams.get('page') || 1));
  const sort = (searchParams.get('sort') as PostListSortType) || 'LATEST';
  const currentPostIdValue =
    Number(searchParams.get('currentPostId')) || undefined;

  const {
    data: postListResponse,
    isLoading,
    isError,
    error,
  } = usePostListQuery({
    category,
    searchTarget,
    searchKeyword,
    page,
    sort,
    size: 5,
  });
  const postList = postListResponse?.data?.posts ?? [];
  const totalPages = postListResponse?.data?.totalPages ?? 1;
  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        Error:{' '}
        {error instanceof Error
          ? error.message
          : '데이터를 불러오지 못했습니다.'}
      </div>
    );
  if (!postListResponse) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <div>
      {/* 글 리스트 */}
      <PostList
        currentPostId={currentPostIdValue}
        searchMode={searchMode}
        postList={postList}
        category={categoryValue}
        searchTarget={searchTarget}
        searchKeyword={searchKeyword}
        page={page}
        sort={sort}
      />

      {/* 검색 */}
      <PostSearch
        category={categoryValue}
        searchTarget={searchTarget}
        searchKeyword={searchKeyword}
      />

      {/* 페이지네이션 */}
      <PostListPagination
        category={categoryValue}
        searchMode={searchMode}
        searchTarget={searchTarget}
        searchKeyword={searchKeyword}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        isError={isError}
        sort={sort}
      />
    </div>
  );
}
