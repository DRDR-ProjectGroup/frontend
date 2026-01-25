import Tag from "@/components/ui/Tag";
import { Heading } from "@/components/ui/Heading";
import UserChip from "@/components/common/UserChip";
import { BsDot } from "react-icons/bs";
import PostContent from "./PostContent.client";
import { getPostDetail } from "@/actions/posts/postDetail.actions";
import type { MediaItem } from "@/types/api/postDetail";
import { postDetail_dummy } from "@/dummy/postDetail";

// placeholder를 실제 이미지 URL로 교체
function replacePlaceholders(content: string, mediaList: MediaItem[]) {
  let processedContent = content;
  
  mediaList.forEach((media) => {
    const placeholder = `{{IMG_${media.order}}}`;
    processedContent = processedContent.replace(placeholder, media.url);
  });
  
  return processedContent;
}

// 글 상세 조회 렌더링 컴포넌트
export default async function PostMeta({ postId }: { postId: string }) {
  // const post = await getPostDetail(postId);

  // 더미 테스트
  const post = postDetail_dummy.data;

  if (!post) {
    return (
      <div className="py-8 text-center text-text-third">
        <p>게시글을 찾을 수 없습니다.</p>
        <p className="text-sm mt-2">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  // placeholder를 실제 이미지 URL로 교체
  const displayContent = replacePlaceholders(post.content, post.mediaList || []);

  return (
    <div>
      <div className="py-4">
        <Tag>{post.category}</Tag>
        <Heading level={1} className="mt-3">{post.title}</Heading>
        <div className="flex items-center gap-2 text-sm mt-4 text-text-third">
          <UserChip name={post.author} />
          <BsDot />
          <span>{post.createdAt}</span>
          <BsDot />
          <span>{`Views ${post.viewCount}`}</span>
          <BsDot />
          <span className="text-primitive-green">{`Likes ${post.likeCount}`}</span>
        </div>
      </div>

      <div className="py-8 border-t border-b border-primitive-grayPrimary">
        <PostContent html={displayContent} />
      </div>
    </div>
  );
}