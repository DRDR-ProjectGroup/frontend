// STOMP : 메시지 규칙 (WebSocket Type 약속)
import { Client } from '@stomp/stompjs';
// SockJS : 연결 방식 (WebSocket or HTTP fallback (long polling 등))
import SockJS from 'sockjs-client';

let client: Client | null = null;

// websocket 연결을 위한 StompClient 객체 생성
export const getStompClient = () => {
  if (client) return client;

  const websocketUrl = process.env.NEXT_PUBLIC_WS_LOCAL_URL;
  if (!websocketUrl) {
    throw new Error('WebSocket URL 없음');
  }

  client = new Client({
    webSocketFactory: () => new SockJS(websocketUrl),
    reconnectDelay: 5000,
    debug: (str) => console.log(str),
  });

  client.activate();

  return client;
};
