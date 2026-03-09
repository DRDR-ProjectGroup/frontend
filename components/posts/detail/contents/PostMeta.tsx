import { replacePlaceholdersWithUrls } from '@/components/posts/write/utils/imageProcessor';
import { fetchPostDetail } from '@/lib/api/post/post.server';
import PostMetaClient from './PostMetaClient';
import { notFound } from 'next/navigation';

// 게시글 메타 정보 컴포넌트 (server)
export default async function PostMeta({ postId }: { postId: number }) {
  const postDetailResponse = await fetchPostDetail(postId);
  if (postDetailResponse.code !== 200 || !postDetailResponse.data) {
    notFound();
  }

  const post = postDetailResponse.data;

  // placeholder를 실제 이미지 URL로 교체
  const displayContent = replacePlaceholdersWithUrls(
    post.content,
    post.mediaList || [],
  );

  return (
    <PostMetaClient
      post={post}
      postId={postId}
      displayContent={displayContent}
    />
  );
}
