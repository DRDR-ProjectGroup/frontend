import { ApiResponse, Pagination } from './common';

// 게시글 아이템 타입
export interface PostItem {
  postId: string;
  title: string;
  content: string;
  author: string;
  category: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  notice: boolean;
}

// 게시글 리스트 데이터 타입
export interface PostListData extends Pagination {
  category: string;
  posts: PostItem[];
}

// 게시글 리스트 조회 API 응답 타입
export type PostListResponse = ApiResponse<PostListData>;

// 게시글 리스트 조회 파라미터 타입
export interface PostListParams {
  category?: string;
  page?: number;
  size?: number;
  searchTarget?: string;
  searchKeyword?: string;
  sort?: 'POPULAR' | 'LATEST';
}
