'use client';

import { useMyPostsQuery } from '@/query/mypage/useMyPageQuery';
import Table from './Table';
import MyPostsPagination from './Pagination';
import { useState } from 'react';

export default function Page() {
  const [page, setPage] = useState(1);
  const {
    data: myPostsResponse,
    isLoading,
    isError,
    error,
  } = useMyPostsQuery({ page });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return (
      <div className="text-primitive-red">
        {error instanceof Error
          ? error.message
          : '데이터를 불러오지 못했습니다.'}
      </div>
    );
  }

  const posts = myPostsResponse?.data?.posts || [];
  const totalPages = myPostsResponse?.data?.totalPages ?? 1;

  return (
    <div>
      <Table posts={posts} />
      <MyPostsPagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
