import Tag from "@/components/ui/Tag";
import { postDetail_dummy } from "@/dummy/postDetail";
import { Heading } from "@/components/ui/Heading";
import UserChip from "@/components/common/UserChip";
import { BsDot } from "react-icons/bs";

export default async function PostMeta(
  { postId }: { postId: string }
) {
  const post = postDetail_dummy.data;
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

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
        {post.content}
      </div>
    </div>
  );
}