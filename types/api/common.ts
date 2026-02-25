// 공통 API 응답 타입 (data는 optional)
export interface ApiResponse<T = undefined> {
  code: number;
  message: string;
  data?: T;
}

// 페이지네이션 공통 타입
export interface Pagination {
  totalCount: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
}
