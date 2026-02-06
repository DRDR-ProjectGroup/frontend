import { login, logout } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { removeAccessToken, setAccessToken } from '@/lib/utils/auth-token';
import { LoginRequest } from '@/types/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 로그인
export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (request: LoginRequest) => login(request),
    onSuccess: (data) => {
      if (data.accessToken) {
        setAccessToken(data.accessToken); // localStorage에 저장
        setAuth(data.accessToken); // Zustand store에 저장
      }
    },
  });
}

// 로그아웃
export function useLogoutMutation() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      clearAuth();
      queryClient.invalidateQueries({ queryKey: ['memberInfo'] });
    },
  });
}
