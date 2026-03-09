import { PostDetailResponse } from '@/types/api/postDetail';
import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

// 게시글 상세 조회
export async function fetchPostDetail(
  postId: number,
): Promise<PostDetailResponse> {
  const res = await fetch(
    `${process.env.BACKEND_API_BASE_URL}/posts/${postId}`,
    {
      next: { revalidate: 60, tags: [`post-${postId}`] }, // fetch 결과를 60초 동안 캐싱
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error('게시글 조회 실패');
  }

  return res.json();
}

// 게시글 수정
export async function updatePost(
  postId: number,
  formData: FormData,
  accessToken: string,
): Promise<PostDetailResponse> {
  const res = await fetch(
    `${process.env.BACKEND_API_BASE_URL}/posts/${postId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    },
  );
  console.log('글 수정 response: ', res);

  if (!res.ok) {
    throw new Error('게시글 수정 실패');
  }

  return res.json();
}
