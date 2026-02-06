// 인증 상태 관리 스토어 (Zustand)

import { create } from 'zustand';
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getUserIdFromToken,
  isTokenExpired,
} from '@/lib/utils/auth-token';
import { refreshAccessToken } from '../api/auth';

interface AuthState {
  // 상태
  accessToken: string | null;
  isLoggedIn: boolean;
  userId: string | null;
  isInitialized: boolean; // 초기화 완료 여부

  // Actions
  setAuth: (token: string) => void;
  clearAuth: () => void;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // 초기 상태
  accessToken: null,
  isLoggedIn: false,
  userId: null,
  isInitialized: false,

  // 로그인 시 호출
  // - 토큰을 저장하고 사용자 정보 추출
  setAuth: (token: string) => {
    setAccessToken(token);
    const userId = getUserIdFromToken(token);

    set({
      accessToken: token,
      isLoggedIn: true,
      userId,
      isInitialized: true,
    });
  },

  // 로그아웃 시 호출
  // - 토큰 삭제 및 상태 초기화
  clearAuth: () => {
    removeAccessToken();

    set({
      accessToken: null,
      isLoggedIn: false,
      userId: null,
      isInitialized: true,
    });
  },

  // 앱 초기화 시 호출 (페이지 새로고침 등)
  // - localStorage에서 토큰 확인
  // - 토큰 만료 시 재발급 시도
  initAuth: async () => {
    const token = getAccessToken();

    // 토큰이 없으면 비로그인 상태
    if (!token) {
      set({
        accessToken: null,
        isLoggedIn: false,
        userId: null,
        isInitialized: true,
      });
      return;
    }

    // 토큰 만료 확인
    if (isTokenExpired(token)) {
      console.log('Token expired, attempting to refresh...');

      // 토큰 재발급 시도
      const newToken = await refreshAccessToken();

      if (newToken) {
        // 재발급 성공
        console.log('Token refreshed successfully');
        const userId = getUserIdFromToken(newToken);
        set({
          accessToken: newToken,
          isLoggedIn: true,
          userId,
          isInitialized: true,
        });
      } else {
        // 재발급 실패 -> 로그아웃
        console.log('Token refresh failed, clearing auth');
        get().clearAuth();
      }
    } else {
      // 토큰이 유효함
      const userId = getUserIdFromToken(token);
      set({
        accessToken: token,
        isLoggedIn: true,
        userId,
        isInitialized: true,
      });
    }
  },
}));
