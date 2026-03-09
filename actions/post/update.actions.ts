'use server';

import { updatePost } from '@/lib/api/post/post.server';
import { revalidateTag } from 'next/cache';

// 글 수정
export async function updatePostAction(
  accessToken: string,
  postId: number,
  formData: FormData,
) {
  try {
    const data = await updatePost(postId, formData, accessToken);
    revalidateTag(`post-${postId}`, 'max'); // 게시글 수정 후 캐시 무효화
    return data;
  } catch (error) {
    console.error('게시글 수정 실패: ', error);
    throw error;
  }
}
