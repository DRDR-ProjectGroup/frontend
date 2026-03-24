'use client';

import { getStompClient } from '@/lib/socket/client';
import ChatPanel from './ChatPanel';
import UserPanel from './UserPanel';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

export default function ChatWrap() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 마운트 시점에 websocket 연결
  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요.');
      router.replace('/login');
      return;
    }
    const client = getStompClient(); // websocket 연결
    if (!client) {
      alert('WebSocket 연결 실패');
      router.replace('/login');
      return;
    }
    return () => {
      client.deactivate(); // 페이지 나가거나, 토큰 변경 시 websocket 연결 해제 (disconnect)
    };
  }, [isLoggedIn]);

  return (
    <div className="mt-4 flex gap-3 h-130">
      <ChatPanel />
      <UserPanel />
    </div>
  );
}
