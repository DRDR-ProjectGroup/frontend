'use client';

import PostList from './PostList';
import PostSearch from './PostSearch';
import PostListPagination from './PostListPagination';
import { PostListParamsProvider } from './PostListParamsContext';
import type { PostListSortType } from '@/types/api/postList';

type PostListWrapProps = {
  currentPostId?: number;
  category: string;
  page?: number;
  sort?: PostListSortType;
};

export default function PostListWrap({
  currentPostId,
  category = 'all',
  page,
  sort,
}: PostListWrapProps) {
  return (
    <PostListParamsProvider
      key={category}
      initialCategory={category}
      initialPage={page}
      initialSort={sort}
    >
      <div>
        {/* 글 리스트 */}
        <PostList currentPostId={currentPostId} />

        {/* 검색 */}
        <PostSearch />

        {/* 페이지네이션 */}
        <PostListPagination />
      </div>
    </PostListParamsProvider>
  );
}
