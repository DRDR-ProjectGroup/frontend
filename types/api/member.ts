import { ApiResponse, Pagination } from './common';
import { PostItem } from './postList';

/* 내 정보 */
// 내 정보 아이템 타입
export interface MemberInfoData {
  memberId: number;
  username: string;
  nickname: string;
  email: string;
}

// 내 정보 조회 API response 타입
export type MemberInfoResponse = ApiResponse<MemberInfoData>;

// 닉네임 변경 request
export type NicknameRequest = {
  newNickname: string;
};

// 닉네임 변경 response
export type NicknameResponse = ApiResponse<undefined>;

// 비밀번호 변경 request
export type PasswordRequest = {
  password: string;
  newPassword: string;
  newPassword2: string;
};

// 비밀번호 변경 response
export type PasswordResponse = ApiResponse<undefined>;

// 회원 탈퇴 request
export type ResignRequest = {
  password: string;
};

// 회원 탈퇴 response
export type ResignResponse = ApiResponse<undefined>;

/* 내 작성글 */
// 내 작성글 아이템 타입
export interface MyPostItem extends PostItem {}

// 페이지네이션
export interface MyPostListData extends Pagination {
  posts: MyPostItem[];
}

// 내 작성글 조회 API response 타입
export type MyPostListResponse = ApiResponse<MyPostListData>;

/* 내 댓글 */
// 내 댓글 아이템 타입
export interface MyCommentItem {
  postId: number;
  content: string;
  createdAt: string;
}

// 페이지네이션
export interface MyCommentListData extends Pagination {
  comments: MyCommentItem[];
}

// 내 댓글 조회 API response 타입
export type MyCommentListResponse = ApiResponse<MyCommentListData>;
