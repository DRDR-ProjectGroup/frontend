import { useState } from 'react';
import { getStompClient } from '@/lib/socket/client';
import type { ReceiveChatMessageResponse } from '@/types/socket/chat';
import { useStompSubscription } from './useStompSubscription';

// 채팅 메시지 hook
export const useChatMessages = () => {
  // 채팅 메시지 상태
  const [messages, setMessages] = useState<ReceiveChatMessageResponse[]>([]);

  useStompSubscription('/sub/chat/message', (message) => {
    setMessages((prev) => [...prev, message]);
  });

  // 채팅 메시지 전송 행동 함수
  const sendMessage = (chat: string) => {
    const client = getStompClient();

    client.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify({ message: chat }),
    });
  };

  return {
    messages,
    sendMessage,
  };
};
