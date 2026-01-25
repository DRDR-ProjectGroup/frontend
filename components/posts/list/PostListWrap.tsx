'use client';

import PostList from './PostList';
import PostSearch from './PostSearch';
import PostListPagination from './PostListPagination';
import { PostListParamsProvider } from './PostListParamsContext';

type PostListWrapProps = {
  category: string;
};

export default function PostListWrap({ category = 'all' }: PostListWrapProps) {
  return (
    <PostListParamsProvider key={category} initialCategory={category}>
      <div>
        {/* 글 리스트 */}
        <PostList />

        {/* 검색 */}
        <PostSearch />

        {/* 페이지네이션 */}
        <PostListPagination />
      </div>
    </PostListParamsProvider>
  );
}