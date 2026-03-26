import { notFound } from 'next/navigation';
import { fetchPostDetail } from '@/lib/api/server/post/post';
import ClientPage from './ClientPage';

// 글 수정
export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  // 글 상세 조회 API -> 글 수정 form 초기값 설정
  const postDetailResponse = await fetchPostDetail(Number(postId));

  if (postDetailResponse.code !== 200) {
    notFound();
  }
  const postData = postDetailResponse.data;
  if (!postData) notFound();

  return <ClientPage post={postData} postId={Number(postId)} />;
}
