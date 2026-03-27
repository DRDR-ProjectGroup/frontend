'use server';

import {
  createPost,
  updatePost,
  deletePost,
  createNotice,
} from '@/lib/api/server/post/post';
import { revalidateTag } from 'next/cache';

// 글 작성
export async function createPostAction(formData: FormData, category: string) {
  try {
    const data = await createPost(formData, category);
    revalidateTag('post-list', 'max');
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
    revalidateTag(`post-detail-${postId}`, 'max');
    revalidateTag('post-list', 'max');
    return data;
  } catch (error) {
    console.error('게시글 수정 실패: ', error);
    throw error;
  }
}

// 글 삭제
export async function deletePostAction(postId: number) {
  try {
    const data = await deletePost(postId);
    revalidateTag(`post-detail-${postId}`, 'max');
    revalidateTag('post-list', 'max');
    return data;
  } catch (error) {
    console.error('게시글 삭제 실패: ', error);
    throw error;
  }
}

// 공지 등록
export async function createNoticeAction(postId: number) {
  try {
    const data = await createNotice(postId);
    revalidateTag(`post-detail-${postId}`, 'max');
    revalidateTag('post-list', 'max');
    return data;
  } catch (error) {
    console.error('공지 등록 실패: ', error);
    throw error;
  }
}
