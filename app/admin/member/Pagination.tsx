import Pagination from '@/components/common/Pagination';

interface MemberPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  isLoading: boolean;
  isError: boolean;
}

export default function MemberPagination({
  page,
  totalPages,
  setPage,
  isLoading,
  isError,
}: MemberPaginationProps) {
  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
      disabled={isLoading || isError}
      showEllipsis={true}
      hideOnSinglePage={true}
    />
  );
}
