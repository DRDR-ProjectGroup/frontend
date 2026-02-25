import { ApiResponse } from './common';

// 좋아요/싫어요 타입
export type LikePostResponse = ApiResponse<{
  likeCount: number;
}>;
