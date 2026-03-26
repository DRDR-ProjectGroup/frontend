'use client';

import PostWriteForm from '@/components/posts/write/PostWriteForm';
import {
  addDataAttMediaIdToImages,
  replacePlaceholdersWithUrls,
} from '@/components/posts/write/utils/imageProcessor';
import { PostData } from '@/types/api/postDetail';

// 글 수정 client page
export default function ClientPage({
  post,
  postId,
}: {
  post: PostData;
  postId: number;
}) {
  // placeholder를 실제 이미지 URL로 변환
  const contentWithImages = replacePlaceholdersWithUrls(
    post.content,
    post.mediaList,
  );

  // 이미지에 data-media-id 속성 추가
  const contentWithDataAttMediaId = addDataAttMediaIdToImages(
    contentWithImages,
    post.mediaList,
  );

  return (
    <PostWriteForm
      mode="edit"
      postId={Number(postId)}
      initialData={{
        title: post.title,
        content: contentWithDataAttMediaId,
        category: post.category,
      }}
    />
  );
}
