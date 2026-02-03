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
      showEllipsis={true} // 게시글이 많을 때 ellipsis 사용
      hideOnSinglePage={true} // 페이지가 1개면 숨김
      className="mt-6"
    />
  );
}
