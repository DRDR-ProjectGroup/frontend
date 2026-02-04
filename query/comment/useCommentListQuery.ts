import { CommentListParams } from '@/types/api/comment';
import { useQuery } from '@tanstack/react-query';
import { fetchCommentList } from '@/lib/api/comment';

// 댓글 리스트 조회
export function useCommentListQuery(params: CommentListParams) {
  return useQuery({
    queryKey: ['commentList', params.postId, params.page], // page 추가하여 페이지별로 캐싱
    queryFn: () => fetchCommentList(params),
    staleTime: 30_000, // 30초
    gcTime: 5 * 60_000, // 5분
  });
}
