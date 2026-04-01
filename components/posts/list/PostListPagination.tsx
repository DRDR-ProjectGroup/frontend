'use client';

import Pagination from '@/components/common/Pagination';
import { useRouter } from 'next/navigation';
import { PostListParamsQuery } from '@/types/api/postList';

interface PostListPaginationProps extends PostListParamsQuery {
  totalPages: number;
}

export default function PostListPagination({
  searchMode,
  category,
  page,
  sort,
  searchTarget,
  searchKeyword,
  totalPages,
}: PostListPaginationProps) {
  const router = useRouter();

  const onPageChange = (page: number) => {
    const baseUrl = `/category/${category}?&page=${page}&sort=${sort}&size=5`;
    const searchParams = searchMode
      ? `&searchMode=true&searchTarget=${searchTarget}&searchKeyword=${searchKeyword}`
      : '';
    const url = `${baseUrl}${searchParams}`;
    router.push(url);
  };

  return (
    <Pagination
      currentPage={page ?? 1}
      totalPages={totalPages}
      onPageChange={onPageChange}
      showEllipsis={true} // 게시글이 많을 때 ellipsis 사용
      hideOnSinglePage={true} // 페이지가 1개면 숨김
      className="mt-6"
    />
  );
}
