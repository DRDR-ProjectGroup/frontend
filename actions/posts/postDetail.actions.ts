import type { PostDetailResponse } from "@/types/api/postDetail";

/**
 * 글 상세 정보 조회
 */
export async function getPostDetail(postId: string) {
  try {
    // TODO: 실제 API URL로 변경 필요
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
      cache: 'no-store', // 또는 revalidate 옵션 사용
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const result: PostDetailResponse = await response.json();
    
    if (result.code !== 200 || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
