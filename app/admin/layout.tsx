import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { serverApiGet } from '@/lib/api/server/apiHelpers';
import { ApiError } from '@/lib/error/api';
import type { MemberInfoResponse } from '@/types/api/member';
import AdminLayoutClient from './AdminLayoutClient';

export type { NavMenu } from './types';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    const res = await serverApiGet<MemberInfoResponse>('/members/me', {
      errorMessage: '내 정보 조회 실패',
    });
    if (res.data?.role !== 'ROLE_ADMIN') {
      redirect('/');
    }
  } catch (e) {
    if (e instanceof ApiError && e.code === 401) {
      redirect('/login');
    }
    throw e;
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
