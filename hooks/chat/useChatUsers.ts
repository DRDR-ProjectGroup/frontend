import { useEffect, useState } from 'react';
import { getStompClient } from '@/lib/socket/client';
import type { ChatUserInfo } from '@/types/socket/chat';

// 접속자 목록 hook
export const useChatUsers = () => {
  // 접속자 목록 상태
  const [users, setUsers] = useState<ChatUserInfo[] | null>(null);

  // 접속자 목록 수신 subscribe
  useEffect(() => {
    const client = getStompClient();

    client.onConnect = () => {
      const subscription = client.subscribe('/sub/chat/users', (message) => {
        const newUsers = JSON.parse(message.body);

        setUsers(newUsers.users);
      });

      return () => subscription.unsubscribe();
    };
  }, []);

  return {
    users,
  };
};
