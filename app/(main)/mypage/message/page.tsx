'use client';

import { useSearchParams } from 'next/navigation';
import NavMenu from './NavMenu';
import MessageTable from './Table';
import { useMessageListQuery } from '@/query/message/useMessageQuery';
import MessagePagination from './Pagination';
import { useRouter } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const type: 'inbox' | 'sent' =
    (searchParams.get('type') as 'inbox' | 'sent') ?? 'inbox';
  const page = Math.max(1, Number(searchParams.get('page') || 1));
  const router = useRouter();

  // 쿼리스트링 정규화
  if (!type || !page) {
    router.push(`/mypage/message?type=${type}&page=${page}`);
  }

  const {
    data: messageListResponse,
    isLoading,
    isError,
  } = useMessageListQuery({
    type,
    page: Number(page),
  });
  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const messages = messageListResponse?.data?.messages ?? [];
  const totalPages = messageListResponse?.data?.totalPages ?? 1;

  const setPage = (page: number) => {
    router.push(`/mypage/message?type=${type}&page=${page}`);
  };

  return (
    <div>
      <div className="px-2">
        <NavMenu type={type} />
      </div>
      <div className="mt-8">
        <MessageTable messages={messages} type={type} page={page} />
      </div>
      <MessagePagination
        page={Number(page)}
        setPage={setPage}
        totalPages={totalPages}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
