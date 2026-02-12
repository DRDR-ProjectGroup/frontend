import { ApiResponse, Pagination } from './common';
import { Author } from './author';
import { CategoryData } from './category';

// 게시글 아이템 타입
export interface PostItem {
  postId: string;
  title: string;
  content: string;
  author: Author; // 작성자 정보
  category: CategoryData; // 게시글 카테고리
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  notice: boolean;
}

// 페이지네이션
export interface PostListData extends Pagination {
  category: string;
  notices: PostItem[];
  posts: PostItem[];
}

// API 공통 응답 타입
export type PostListResponse = ApiResponse<PostListData>;

// 게시글 리스트 조회 파라미터 타입
export interface PostListParams {
  category?: string;
  page?: number;
  size?: number;
  searchTarget?: PostListSearchTargetType;
  searchKeyword?: string;
  sort?: PostListSortType;
}

// sort
export type PostListSortType = 'POPULAR' | 'LATEST';

// searchTarget
export type PostListSearchTargetType = 'ALL' | 'TITLE' | 'CONTENT' | 'AUTHOR';
