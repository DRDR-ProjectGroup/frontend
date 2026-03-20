// STOMP : 메시지 규칙 (WebSocket Type 약속)
// SockJS : 연결 방식 (WebSocket or HTTP fallback (long polling 등))
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthStore } from '../store/authStore';

let client: Client | null = null;
let currentToken: string | null = null;

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
  const accessToken = useAuthStore.getState().accessToken;
  if (!accessToken) return null;

  const websocketUrl = process.env.NEXT_PUBLIC_WS_LOCAL_URL;
  if (!websocketUrl) return null;

  // 토큰 바뀌면 재생성 -> 연결 해제 후 재연결 ("WebSocket은 HTTP처럼 매 요청마다 인증하지 않는다" : 연결 시 1번 인증 -> 이후 계속 유지)
  if (client && currentToken !== accessToken) {
    console.log('🔥 CLIENT EXIST AND TOKEN CHANGED => client deactivate');
    client.deactivate();
    client = null;
  }

  // 연결 종료 시 재생성
  if (client && !client.active) {
    console.log('🔥 DEAD CLIENT → recreate');
    client = null;
  }

  if (client) return client;

  currentToken = accessToken;

  console.log('🔥 NEW CLIENT CREATED');
  client = new Client({
    webSocketFactory: () => new SockJS(websocketUrl),
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
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
