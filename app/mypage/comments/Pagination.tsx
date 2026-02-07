'use client';

import Pagination from '@/components/common/Pagination';

type MyCommentsPaginationProps = {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
  isError: boolean;
};

export default function MyCommentsPagination({
  totalPages,
  page,
  setPage,
  isLoading,
  isError,
}: MyCommentsPaginationProps) {
  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
      disabled={isLoading || isError}
      showEllipsis={true} // 게시글이 많을 때 ellipsis 사용
      hideOnSinglePage={true} // 페이지가 1개면 숨김
      className="mt-6"
    />
  );
}
