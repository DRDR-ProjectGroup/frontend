import { ApiResponse, Pagination } from './common';
import { Author } from './author';
import { CategoryData } from './category';

// 게시글 상세 타입
export interface PostDetailData {
  postId: string;
  title: string;
  content: string;
  author: Author;
  category: CategoryData;
  viewCount: number;
  likeCount: number;
  mediaList: MediaItem[];
  createdAt: string;
  notice: boolean;
  memberLikeType: 'LIKE' | 'DISLIKE' | null;
}

// 미디어 아이템 타입
export interface MediaItem {
  mediaId: string;
  url: string;
  order: number;
}

// 게시글 상세 조회 API 응답 타입
export type PostDetailResponse = ApiResponse<PostDetailData>;
