// 인증 상태 관리 스토어 (Zustand)

import { create } from 'zustand';
import {
  getUserIdFromToken,
  getUserRoleFromToken,
} from '@/lib/utils/auth-token';
import { refreshAccessToken } from '../api/auth';
import { UserRole } from '@/types/api/auth';

interface AuthState {
  // 상태
  accessToken: string | null; // localStorage 에 저장 X -> Zustand 에서 관리
  isLoggedIn: boolean;
  userId: string | null;
  isInitialized: boolean; // 초기화 완료 여부
  role: UserRole | null; // 권한 (admin, user)

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
  role: null,

  // 로그인 시 호출
  // - 토큰을 저장하고 사용자 정보 추출
  setAuth: (token: string) => {
    const userId = getUserIdFromToken(token);
    const role = getUserRoleFromToken(token);

    set({
      accessToken: token,
      isLoggedIn: true,
      userId,
      role,
      isInitialized: true,
    });
  },

  // 로그아웃 시 호출
  // - 토큰 삭제 및 상태 초기화
  clearAuth: () => {
    set({
      accessToken: null,
      isLoggedIn: false,
      userId: null,
      role: null,
      isInitialized: true,
    });
  },

  // 앱 초기화 시 호출 (페이지 새로고침 등)
  // - reissue api 호출 -> accessToken 재발급 시도
  initAuth: async () => {
    try {
      const token = await refreshAccessToken();
      if (!token) return;
      const userId = getUserIdFromToken(token);
      const role = getUserRoleFromToken(token);
      set({
        accessToken: token,
        isLoggedIn: true,
        userId,
        role,
        isInitialized: true,
      });
    } catch (error) {
      get().clearAuth();
      return;
    }
  },
}));
