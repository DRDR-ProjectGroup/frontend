// STOMP : 메시지 규칙 (WebSocket Type 약속)
// SockJS : 연결 방식 (WebSocket or HTTP fallback (long polling 등))
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let client: Client | null = null;

// 연결 성공 리스너 (subscribe 할 때 사용)
const connectListeners: (() => void)[] = [];
export const addOnConnectListener = (fn: () => void) => {
  connectListeners.push(fn);
};
export const removeOnConnectListener = (fn: () => void) => {
  const idx = connectListeners.indexOf(fn);
  if (idx !== -1) connectListeners.splice(idx, 1);
};

// STOMP Client 생성 및 반환
export const getStompClient = () => {
  const websocketUrl = process.env.NEXT_PUBLIC_WS_URL;
  if (!websocketUrl) return null;

  // 활성 상태면 기존 client 재사용
  if (client?.active) return client;

  // 연결 종료 시 재생성
  if (client && !client.active) {
    console.log('🔥 DEAD CLIENT → recreate');
    client = null;
  }

  // 새로운 client 생성 (웹소켓 연결 시도)
  console.log('🔥 NEW CLIENT CREATED');
  client = new Client({
    webSocketFactory: () => new SockJS(websocketUrl),
    reconnectDelay: 5000,
    onConnect: (frame) => {
      console.log('✅ WebSocket 연결 성공 => ', frame.headers);
      // 등록된 모든 리스너 실행
      connectListeners.forEach((listener) => listener());
    },
    onStompError: (frame) => {
      console.log('❌ STOMP 에러', frame.headers['message']);
    },
    onWebSocketError: (event) => {
      console.log('❌ WebSocket 연결 실패', event);
    },
    onWebSocketClose: () => {
      console.log('⚠️ WebSocket 연결 종료');
    },
    // debug: (str) => console.log(str),
  });

  client.activate();

  return client;
};
