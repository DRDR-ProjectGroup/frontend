import { PostDetailResponse } from "@/types/api/postDetail";

export const postDetail_dummy: PostDetailResponse = {
  code: 200,
  message: "글 조회 성공",
  data: {
    postId: "1",
    title: "Elden Ring 공략 - 초반 보스 전략 가이드",
    content: `
      <h2>서론</h2>
      <p>엘든 링의 초반 보스들은 처음 시작하는 플레이어들에게 큰 도전이 될 수 있습니다. 이 가이드에서는 효과적인 공략법을 소개합니다.</p>
      
      <h3>1. 마르기트 전투 준비</h3>
      <p>마르기트를 상대하기 전에 충분한 레벨업이 필요합니다. 최소 레벨 20 이상을 권장하며, 무기는 +3 이상 강화해야 합니다.</p>
      
      <img src="{{IMG_0}}" alt="마르기트 전투 스크린샷" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0;" />
      
      <h3>2. 추천 전략</h3>
      <ul>
        <li><strong>근접 빌드:</strong> 롤링으로 공격을 회피하고 반격하세요</li>
        <li><strong>마법 빌드:</strong> 거리를 유지하며 마법 공격을 사용하세요</li>
        <li><strong>소환물 활용:</strong> NPC 소환으로 어그로를 분산시킬 수 있습니다</li>
      </ul>
      
      <p>특히 마르기트의 2페이즈에서는 새로운 공격 패턴이 추가되므로 주의가 필요합니다.</p>
      
      <img src="{{IMG_1}}" alt="마르기트 2페이즈" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0;" />
      
      <h3>3. 보상 아이템</h3>
      <p>마르기트를 처치하면 다음 아이템들을 획득할 수 있습니다:</p>
      <blockquote>
        <p>- 마르기트의 대검<br/>
        - 대량의 룬<br/>
        - 스톰베일 성 진입 권한</p>
      </blockquote>
      
      <img src="{{IMG_2}}" alt="보상 아이템" style="width: 100%; max-width: 600px; height: auto; margin: 20px 0;" />
      
      <h3>결론</h3>
      <p>충분한 준비와 인내심만 있다면 누구나 마르기트를 클리어할 수 있습니다. 포기하지 마세요!</p>
    `,
    author: "DarkSoulFan",
    viewCount: 1247,
    likeCount: 89,
    category: "PC game",
    mediaList: [
      {
        url: "C:\\Users\\김보민\\Documents\\dorandoranMedia\\image1.png",
        order: 0
      },
      {
        url: "C:\\Users\\김보민\\Documents\\dorandoranMedia\\image2.png",
        order: 1
      },
      {
        url: "C:\\Users\\김보민\\Documents\\dorandoranMedia\\image3.png",
        order: 2
      }
    ],
    createdAt: "2025-01-20 14:30",
    notice: false
  }
}