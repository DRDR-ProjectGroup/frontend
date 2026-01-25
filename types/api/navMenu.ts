import { ApiResponse, Pagination } from './common';

// 네비게이션 메뉴 아이템 타입
export interface NavMenuData {
  groupId: number,
  groupName: string,
  categories: NavMenuCategory[]
}

// 네비게이션 메뉴 카테고리 타입
export interface NavMenuCategory {
  categoryId: number,
  categoryName: string,
  categoryAddress: string
}

// 네비게이션 메뉴 조회 API 응답 타입
export type NavMenuResponse = ApiResponse<NavMenuData[]>;
