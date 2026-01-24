 import { useQuery } from '@tanstack/react-query';
 import { fetchPostListClient } from '@/lib/api/post.client';
 import type { PostListParams } from '@/lib/api/post.server';
 
 export function usePostListQuery(params: PostListParams) {
   const {
     category = 'all',
     page = 1,
     size = 20,
     searchTarget = '',
     searchKeyword = '',
     sort = 'POPULAR',
   } = params;
 
   return useQuery({
     queryKey: [
       'postList',
       category,
       page,
       size,
       searchTarget,
       searchKeyword,
       sort,
     ],
     queryFn: () =>
       fetchPostListClient({
         category,
         page,
         size,
         searchTarget,
         searchKeyword,
         sort,
       }),
     staleTime: 30_000,
     gcTime: 5 * 60_000,
   });
 }
 
