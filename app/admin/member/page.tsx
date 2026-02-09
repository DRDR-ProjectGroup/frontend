'use client';

import Table from './Table';
import Pagination from './Pagination';
import { useAdminMemberListQuery } from '@/query/adminMember/useAdminMemberQuery';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') || 1));
  const router = useRouter();

  if (!page) {
    router.push(`/admin/member?page=${page}`);
  }

  const {
    data: memberListData,
    isLoading,
    isError,
  } = useAdminMemberListQuery({ page, size: 2 });
  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const memberList = memberListData?.data?.members ?? [];
  const totalPages = memberListData?.data?.totalPages ?? 1;

  const setPage = (page: number) => {
    router.push(`/admin/member?page=${page}`);
  };

  return (
    <div>
      <div className="mt-8">
        <Table memberList={memberList} />
      </div>
      <div className="mt-6">
        <Pagination
          page={Number(page)}
          setPage={setPage}
          totalPages={totalPages}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}
