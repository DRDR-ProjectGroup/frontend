// 메인 페이지 구성
// : 인기글 리스트 목록
import PostListWrap from '@/components/posts/list/PostListWrap';
import { fetchPostList } from '@/lib/api/server/post/post';
import { getPostListParams } from '@/lib/utils/getPostListParams';
import { notFound } from 'next/navigation';

export default async function Page() {
  const postListParamsQuery = {
    category: 'all',
  };
  const postListParams = getPostListParams(postListParamsQuery);
  const postListResponse = await fetchPostList(postListParams);
  if (!postListResponse.data || postListResponse.code !== 200) {
    notFound();
  }
  const postListData = postListResponse.data;

  return (
    <div>
      <PostListWrap
        postListParams={postListParams}
        postListData={postListData}
      />
    </div>
  );
}
