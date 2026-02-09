// 메인 페이지 구성
// : 인기글 리스트 목록
import PostListWrap from '@/components/posts/list/PostListWrap';

export default function Home() {
  return (
    <div>
      <PostListWrap category="all" />
    </div>
  );
}
