import { apiDelete, apiGet, apiPost, apiPut } from '@/lib/api/apiClient';
import { GroupAndCategoryResponse } from '@/types/api/category';
import { ApiResponse } from '@/types/api/common';

// 그룹 및 카테고리 조회
export async function fetchGroupAndCategory(): Promise<GroupAndCategoryResponse> {
  return apiGet<GroupAndCategoryResponse>(`/categories`, {
    errorMessage: '그룹 및 카테고리 조회 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

// 그룹 추가
export async function addGroup(groupName: string): Promise<ApiResponse> {
  return apiPost<ApiResponse>(`/admin/groups`, {
    body: { groupName },
    errorMessage: '그룹 추가 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

// 그룹 수정
export async function updateGroup(
  groupId: string,
  groupName: string,
): Promise<ApiResponse> {
  return apiPut<ApiResponse>(`/admin/groups/${groupId}`, {
    body: { groupName },
    errorMessage: '그룹 수정 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

// 그룹 삭제
export async function deleteGroup(groupId: string): Promise<ApiResponse> {
  return apiDelete<ApiResponse>(`/admin/groups/${groupId}`, {
    errorMessage: '그룹 삭제 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

// 카테고리 추가
export async function addCategory(
  groupId: string,
  categoryName: string,
  categoryAddress: string,
): Promise<ApiResponse> {
  return apiPost<ApiResponse>(`/admin/categories`, {
    body: { groupId, categoryName, categoryAddress },
    errorMessage: '카테고리 추가 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

// 카테고리 수정
export async function updateCategory(
  categoryId: string,
  categoryName: string,
  categoryAddress: string,
  groupId: string,
): Promise<ApiResponse> {
  return apiPut<ApiResponse>(`/admin/categories/${categoryId}`, {
    body: { categoryName, categoryAddress, groupId },
    errorMessage: '카테고리 수정 실패',
    requireAuthOptions: { requireAuth: true },
  });
}

// 카테고리 삭제
export async function deleteCategory(categoryId: string): Promise<ApiResponse> {
  return apiDelete<ApiResponse>(`/admin/categories/${categoryId}`, {
    errorMessage: '카테고리 삭제 실패',
    requireAuthOptions: { requireAuth: true },
  });
}
