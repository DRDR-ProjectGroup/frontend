'use client';

import { useMyCommentsQuery } from '@/query/mypage/useMyPageQuery';
import Table from './Table';
import MyCommentsPagination from './Pagination';
import { useState } from 'react';

// 내 댓글 조회
export default function Page() {
  const [page, setPage] = useState(1);
  const {
    data: myCommentsResponse,
    isLoading,
    isError,
    error,
  } = useMyCommentsQuery({ page });

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

  const comments = myCommentsResponse?.data?.comments || [];
  const totalPages = myCommentsResponse?.data?.totalPages ?? 1;

  return (
    <div>
      <Table comments={comments} />
      <MyCommentsPagination
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
