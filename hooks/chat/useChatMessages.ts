import { useEffect, useState } from 'react';
import { getStompClient } from '@/lib/socket/client';
import type { ReceiveChatMessageResponse } from '@/types/socket/chat';

// 채팅 메시지 hook
export const useChatMessages = () => {
  // 채팅 메시지 상태
  const [messages, setMessages] = useState<ReceiveChatMessageResponse[]>([]);

  // 채팅 메시지 수신 subscribe 사이드 이펙트
  useEffect(() => {
    const client = getStompClient();

    client.onConnect = () => {
      const subscription = client.subscribe('/sub/chat/message', (message) => {
        const newMessage = JSON.parse(message.body);

        setMessages((prev) => [...prev, newMessage]);
      });

      return () => subscription.unsubscribe();
    };
  }, []);

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
