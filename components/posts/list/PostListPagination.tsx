 'use client';
 
 import Pagination from '@/components/common/Pagination';
 import { usePostListQuery } from '@/query/post/usePostListQuery';
 import { usePostListParams } from './PostListParamsContext';
 
 export default function PostListPagination() {
   const { params, setPage } = usePostListParams();
   const { data, isLoading, isError } = usePostListQuery(params);
 
   const totalPages = data?.data?.totalPages ?? 1;
 
   return (
     <Pagination
       currentPage={params.page}
       totalPages={totalPages}
       onPageChange={setPage}
       disabled={isLoading || isError}
       className="mt-6"
     />
   );
 }
 
