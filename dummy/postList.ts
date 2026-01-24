import { PostListResponse } from "@/types/api/postList";

export const postList_dummy: PostListResponse = {
    code: 200,
    message: "전체 인기글 조회 성공",
    data: {
      totalCount: 101,
      pageSize: 20,
      totalPages: 6,
      currentPage: 1,
      category: "",
      posts: [
        {
        postId: "1",
        title: "테스트용 제목 1",
        content: "테스트용 내용 1",
        author: "test1",
        category: "PC game",
        viewCount: 5,
        likeCount: 0,
        commentCount: 9,
        createdAt: "2026-01-21T16:35:04.047746",
        notice: false
      },
      {
			  postId: "2",
        title: "테스트용 제목 2",
        content: "테스트용 내용 2",
        author: "test2",
        category: "Console game",
        viewCount: 5,
        likeCount: 0,
        commentCount: 9,
        createdAt: "2026-01-21T16:35:04.047746",
        notice: false
		  }
    ]}
  };