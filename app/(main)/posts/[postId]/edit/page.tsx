'use client';

import { useParams } from 'next/navigation';
import { usePostDetailQuery } from '@/query/post/usePostDetailQuery';
import PostWriteForm from '@/components/posts/write/PostWriteForm';
import { replacePlaceholdersWithUrls } from '@/components/posts/write/utils/imageProcessor';

// 글 수정
export default function PostEditPage() {
  const params = useParams();
  const postId = params.postId;

  // 기존 상세 조회 API 재사용
  const { data: postDetailResponse, isLoading } = usePostDetailQuery(
    Number(postId),
  );

  if (isLoading) return <div>Loading...</div>;

  const post = postDetailResponse?.data;
  if (!post) return <div>글을 찾을 수 없습니다.</div>;

  // ✅ placeholder를 실제 이미지 URL로 변환
  const contentWithImages = replacePlaceholdersWithUrls(
    post.content,
    post.mediaList,
  );

  return (
    <PostWriteForm
      mode="edit"
      postId={Number(postId)}
      initialData={{
        title: post.title,
        content: contentWithImages,
        category: post.category,
      }}
    />
  );
}
