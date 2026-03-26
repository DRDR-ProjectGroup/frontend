'use server';

import { createPost, updatePost } from '@/lib/api/server/post/post';
import { revalidateTag } from 'next/cache';

// 글 작성
export async function createPostAction(formData: FormData, category: string) {
  try {
    const data = await createPost(formData, category);
    return data;
  } catch (error) {
    console.error('게시글 작성 실패: ', error);
    throw error;
  }
}

// 글 수정
export async function updatePostAction(postId: number, formData: FormData) {
  try {
    const data = await updatePost(postId, formData);
    revalidateTag(`post-${postId}`, 'max'); // 게시글 수정 후 캐시 무효화
    return data;
  } catch (error) {
    console.error('게시글 수정 실패: ', error);
    throw error;
  }
}
