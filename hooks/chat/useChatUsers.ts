import { useState } from 'react';
import type { ChatUserInfo } from '@/types/socket/chat';
import { useStompSubscription } from './useStompSubscription';

// 접속자 목록 hook
export const useChatUsers = () => {
  // 접속자 목록 상태
  const [users, setUsers] = useState<ChatUserInfo[] | null>(null);

  useStompSubscription('/sub/chat/users', (message) => {
    setUsers(message.users);
  });

  return {
    users,
  };
};
