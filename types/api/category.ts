import { ApiResponse } from './common';

// 게시글 카테고리 타입
export interface CategoryData {
  categoryId: number;
  categoryName: string;
  categoryAddress: string;
}

// 게시글 카테고리 그룹 data 타입
export interface GroupData {
  groupId: number;
  groupName: string;
  categories: CategoryData[];
}

// 그룹 및 카테고리 조회 response 타입
export type GroupAndCategoryResponse = ApiResponse<GroupData[]>;
