import { PostDetailResponse } from "@/types/api/postDetail";

export const postDetail_dummy: PostDetailResponse = {
  code: 200,
  message: "글 조회 성공",
  data: {
    postId: "1",
    title: "테스트용 제목 1",
    content: "테스트용 내용 1",
    author: "test1",
    viewCount: 0,
    likeCount: 0,
    category: "PC game",
    mediaList: [{
      url: "C:\\Users\\김보민\\Documents\\dorandoranMedia\\images1.png",
      order: 1
    }],
    createdAt: "2025-01-15 14:30",
    notice: false
  }
}