'use client';

import { getStompClient } from '@/lib/socket/client';
import ChatPanel from './ChatPanel';
import ParticipantPanel from './ParticipantPanel';
import { useEffect } from 'react';

export default function ChatWrap() {
  // 마운트 시점에 websocket 연결
  useEffect(() => {
    const client = getStompClient();

    return () => {
      client.deactivate(); // 페이지 나가면(언마운트 시) websocket 연결 해제 (disconnect)
    };
  }, []);

  return (
    <div className="mt-4 flex gap-3 h-150">
      <ChatPanel />
      <ParticipantPanel />
    </div>
  );
}
