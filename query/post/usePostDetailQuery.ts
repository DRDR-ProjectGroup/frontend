import { useQuery } from '@tanstack/react-query';
import { fetchPostDetail } from '@/lib/api/post';

// 글 상세 조회
export function usePostDetailQuery(postId: number) {
  return useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => fetchPostDetail(postId),
    staleTime: 60_000, // 1분
    gcTime: 10 * 60_000, // 10분
    enabled: !!postId, // postId가 있을 때만 실행
  });
}
