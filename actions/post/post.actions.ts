'use server';

import {
  createPost,
  updatePost,
  deletePost,
  createNotice,
} from '@/lib/api/server/post/post';
import { revalidatePath, revalidateTag } from 'next/cache';

// 글 작성
export async function createPostAction(formData: FormData, category: string) {
  try {
    const response = await createPost(formData, category);
    revalidateTag('post-list', 'max');
    revalidatePath('/', 'page');
    return response;
  } catch (error) {
    console.error('게시글 작성 실패: ', error);
    throw error;
  }
}

// 글 수정
export async function updatePostAction(postId: number, formData: FormData) {
  try {
    const response = await updatePost(postId, formData);
    revalidateTag(`post-detail-${postId}`, 'max');
    revalidateTag('post-list', 'max');
    revalidatePath('/', 'page');
    return response;
  } catch (error) {
    console.error('게시글 수정 실패: ', error);
    throw error;
  }
}

// 글 삭제
export async function deletePostAction(postId: number) {
  try {
    const response = await deletePost(postId);
    revalidateTag(`post-detail-${postId}`, 'max');
    revalidateTag('post-list', 'max');
    revalidatePath('/', 'page');
    return response;
  } catch (error) {
    console.error('게시글 삭제 실패: ', error);
    throw error;
  }
}

// 공지 등록
export async function createNoticeAction(postId: number) {
  try {
    const response = await createNotice(postId);
    revalidateTag(`post-detail-${postId}`, 'max');
    revalidateTag('post-list', 'max');
    revalidatePath('/', 'page');
    return response;
  } catch (error) {
    console.error('공지 등록 실패: ', error);
    throw error;
  }
}
