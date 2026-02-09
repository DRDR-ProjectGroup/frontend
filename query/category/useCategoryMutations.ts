import {
  addCategory,
  addGroup,
  deleteCategory,
  deleteGroup,
  updateCategory,
  updateGroup,
} from '@/lib/api/admin/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 그룹 추가
export const useAddGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ groupName }: { groupName: string }) => addGroup(groupName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupAndCategory'] });
    },
  });
};

// 그룹 수정
export const useUpdateGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      groupId,
      groupName,
    }: {
      groupId: string;
      groupName: string;
    }) => updateGroup(groupId, groupName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupAndCategory'] });
    },
  });
};

// 그룹 삭제
export const useDeleteGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId }: { groupId: string }) => deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupAndCategory'] });
    },
  });
};

// 카테고리 추가
export const useAddCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      groupId,
      categoryName,
      categoryAddress,
    }: {
      groupId: string;
      categoryName: string;
      categoryAddress: string;
    }) => addCategory(groupId, categoryName, categoryAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupAndCategory'] });
    },
  });
};

// 카테고리 수정
export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      categoryId,
      categoryName,
      categoryAddress,
      groupId,
    }: {
      categoryId: string;
      categoryName: string;
      categoryAddress: string;
      groupId: string;
    }) => updateCategory(categoryId, categoryName, categoryAddress, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupAndCategory'] });
    },
  });
};

// 카테고리 삭제
export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId }: { categoryId: string }) =>
      deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupAndCategory'] });
    },
  });
};
