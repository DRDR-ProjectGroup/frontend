import { useQuery } from '@tanstack/react-query';
import {
  fetchMemberInfo,
  fetchMyComments,
  fetchMyPosts,
} from '@/lib/api/mypage';

// 내 정보 조회
export function useMyInfoQuery() {
  return useQuery({
    queryKey: ['myPage', 'info'],
    queryFn: () => fetchMemberInfo(),
    staleTime: 30000,
    gcTime: 5 * 60000, // 5분
  });
}

// 내 작성글 조회
export function useMyPostsQuery({ page }: { page: number }) {
  return useQuery({
    queryKey: ['myPage', 'posts', page],
    queryFn: () => fetchMyPosts({ page }),
    staleTime: 30000,
    gcTime: 5 * 60000, // 5분
  });
}

// 내 댓글 조회
export function useMyCommentsQuery({ page }: { page: number }) {
  return useQuery({
    queryKey: ['myPage', 'comments', page],
    queryFn: () => fetchMyComments({ page }),
    staleTime: 30000,
    gcTime: 5 * 60000, // 5분
  });
}
