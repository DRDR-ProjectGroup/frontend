import { getLikeCount } from '@/lib/api/like';
import { useQuery } from '@tanstack/react-query';

interface UseLikeQueryProps {
  postId: number;
}

export function useLikeQuery({ postId }: UseLikeQueryProps) {
  return useQuery({
    queryKey: ['like', postId],
    queryFn: () => getLikeCount(postId),
    staleTime: 60_000, // 1분
    gcTime: 10 * 60_000, // 10분
    enabled: !!postId, // postId가 있을 때만 실행
  });
}
