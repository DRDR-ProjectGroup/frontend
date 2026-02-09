import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
} from '@/lib/api/apiClient';
import { GroupAndCategoryResponse } from '@/types/api/category';
import { ApiResponse } from '@/types/api/common';

// 그룹 및 카테고리 조회
export async function fetchGroupAndCategory(): Promise<GroupAndCategoryResponse> {
  return apiGet<GroupAndCategoryResponse>(
    `/categories`,
    undefined,
    '그룹 및 카테고리 조회 실패',
  );
}

// 그룹 추가
export async function addGroup(groupName: string): Promise<ApiResponse> {
  return apiPost<ApiResponse>(
    `/admin/groups`,
    { groupName },
    undefined,
    '그룹 추가 실패',
  );
}

// 그룹 수정
export async function updateGroup(
  groupId: string,
  groupName: string,
): Promise<ApiResponse> {
  return apiPut<ApiResponse>(
    `/admin/groups/${groupId}`,
    { groupName },
    undefined,
    '그룹 수정 실패',
  );
}

// 그룹 삭제
export async function deleteGroup(groupId: string): Promise<ApiResponse> {
  return apiDelete<ApiResponse>(`/admin/groups/${groupId}`, '그룹 삭제 실패');
}

// 카테고리 추가
export async function addCategory(
  groupId: string,
  categoryName: string,
  categoryAddress: string,
): Promise<ApiResponse> {
  return apiPost<ApiResponse>(
    `/admin/categories`,
    { groupId, categoryName, categoryAddress },
    undefined,
    '카테고리 추가 실패',
  );
}

// 카테고리 수정
export async function updateCategory(
  categoryId: string,
  categoryName: string,
  categoryAddress: string,
  groupId: string,
): Promise<ApiResponse> {
  return apiPut<ApiResponse>(
    `/admin/categories/${categoryId}`,
    { categoryName, categoryAddress, groupId },
    undefined,
    '카테고리 수정 실패',
  );
}

// 카테고리 삭제
export async function deleteCategory(categoryId: string): Promise<ApiResponse> {
  return apiDelete<ApiResponse>(
    `/admin/categories/${categoryId}`,
    '카테고리 삭제 실패',
  );
}
