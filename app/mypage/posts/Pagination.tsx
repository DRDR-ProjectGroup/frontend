'use client';

import Pagination from '@/components/common/Pagination';

type MyPostsPaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
};

export default function MyPostsPagination({
  page,
  setPage,
  totalPages,
  isLoading,
  isError,
}: MyPostsPaginationProps) {
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
