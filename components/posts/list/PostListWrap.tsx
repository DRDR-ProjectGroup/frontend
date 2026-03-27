import PostList from './PostList';
import PostSearch from './PostSearch';
import PostListPagination from './PostListPagination';
import type { PostListData, PostListParams } from '@/types/api/postList';

type PostListWrapProps = {
  postListData: PostListData;
  postListParams: PostListParams;
};

export default function PostListWrap({
  postListData,
  postListParams,
}: PostListWrapProps) {
  const postList = postListData.posts;
  const notices = postListData.notices || [];
  const totalPages = postListData.totalPages;
  const categoryTitle = postListData.category || '전체글';

  return (
    <div>
      {/* 글 리스트 */}
      <PostList
        {...postListParams}
        categoryTitle={categoryTitle}
        notices={notices}
        postList={postList}
      />

      {/* 검색 */}
      <PostSearch
        category={postListParams.category}
        searchTarget={postListParams.searchTarget}
        searchKeyword={postListParams.searchKeyword}
      />

      {/* 페이지네이션 */}
      <PostListPagination {...postListParams} totalPages={totalPages} />
    </div>
  );
}
