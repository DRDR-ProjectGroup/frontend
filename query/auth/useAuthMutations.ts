import { login, logout } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { LoginRequest } from '@/types/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 로그인
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: LoginRequest) => login(request),
    onSuccess: () => {
      queryClient.clear();
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
      queryClient.clear();
    },
  });
}
