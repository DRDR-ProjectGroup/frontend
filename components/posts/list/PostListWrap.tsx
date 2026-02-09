'use client';

import PostList from './PostList';
import PostSearch from './PostSearch';
import PostListPagination from './PostListPagination';
import { usePostListParams } from '@/hooks/usePostListParams';
import type { PostListParams } from '@/types/api/postList';
import { usePostListQuery } from '@/query/post/usePostListQuery';

interface PostListWrapProps extends PostListParams {}

export default function PostListWrap({ category = 'all' }: PostListWrapProps) {
  const {
    searchMode,
    category: categoryValue,
    searchTarget,
    searchKeyword,
    page,
    sort,
    currentPostId,
  } = usePostListParams(category);
  const postListParams = {
    category: categoryValue,
    searchTarget,
    searchKeyword,
    page,
    sort,
    searchMode,
  };

  const {
    data: postListResponse,
    isLoading,
    isError,
    error,
  } = usePostListQuery({
    category: categoryValue,
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
        {...postListParams}
        currentPostId={currentPostId}
        postList={postList}
      />

      {/* 검색 */}
      <PostSearch
        category={postListParams.category}
        searchTarget={postListParams.searchTarget}
        searchKeyword={postListParams.searchKeyword}
      />

      {/* 페이지네이션 */}
      <PostListPagination
        {...postListParams}
        totalPages={totalPages}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
