import { changeNickname, changePassword, resign } from '@/lib/api/mypage';
import {
  NicknameRequest,
  PasswordRequest,
  ResignRequest,
} from '@/types/api/member';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 닉네임 변경
export function useChangeNicknameMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newNickname }: NicknameRequest) =>
      changeNickname({ newNickname }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPage'] });
      queryClient.invalidateQueries({ queryKey: ['postList'] });
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
      queryClient.invalidateQueries({ queryKey: ['postDetail'] });
    },
  });
}

// 비밀번호 변경
export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: ({ password, newPassword, newPassword2 }: PasswordRequest) =>
      changePassword({ password, newPassword, newPassword2 }),
  });
}

// 회원 탈퇴
export function useResignMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ password }: ResignRequest) => resign({ password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList'] });
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
      queryClient.invalidateQueries({ queryKey: ['postDetail'] });
      queryClient.removeQueries({ queryKey: ['myPage'] });
    },
  });
}
