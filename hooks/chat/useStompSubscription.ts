import {
  addOnConnectListener,
  getStompClient,
  removeOnConnectListener,
} from '@/lib/socket/client';
import { StompSubscription } from '@stomp/stompjs';
import { useEffect } from 'react';

// STOMP 구독 공통 hook
export const useStompSubscription = (
  destination: string,
  callback: (message: any) => void,
) => {
  useEffect(() => {
    const client = getStompClient();
    if (!client) return;
    let subscription: StompSubscription | null = null;

    const subscribe = () => {
      if (subscription) return;

      subscription = client.subscribe(destination, (msg) => {
        callback(JSON.parse(msg.body));
      });
    };

    if (client.connected) {
      subscribe();
    } else {
      addOnConnectListener(subscribe);
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      removeOnConnectListener(subscribe);
    };
  }, [destination]);
};
