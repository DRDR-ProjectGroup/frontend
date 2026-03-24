// 인증 상태 관리 스토어 (Zustand)

import { create } from 'zustand';
import {
  getUserIdFromToken,
  getUserRoleFromToken,
} from '@/lib/utils/auth-token';
import { UserRole } from '@/types/api/auth';
import { fetchMemberInfo } from '@/lib/api/client/mypage/mypage';

interface AuthState {
  // 상태
  isLoggedIn: boolean;
  userId: string | null;
  isInitialized: boolean; // 초기화 완료 여부
  role: UserRole | null; // 권한 (admin, user)

  // Actions
  clearAuth: () => void;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // 초기 상태
  isLoggedIn: false,
  userId: null,
  isInitialized: false,
  role: null,

  // 로그아웃 시 호출
  // - 토큰 삭제 및 상태 초기화
  clearAuth: () => {
    set({
      isLoggedIn: false,
      userId: null,
      role: null,
      isInitialized: true,
    });
  },

  // 앱 초기화 시 호출 (페이지 새로고침 등)
  // /members/me api 호출 -> member info 조회
  initAuth: async () => {
    try {
      const memberInfo = await fetchMemberInfo({ replaceLoginPage: false });
      if (!memberInfo.data) throw new Error('member info data 없음');
      const userId = memberInfo.data.memberId.toString();
      const role = memberInfo.data.role;
      set({
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
