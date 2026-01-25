import Comments from "@/components/posts/detail/Comments";
import PostMeta from "@/components/posts/detail/PostMeta";
import PostReactions from "@/components/posts/detail/PostReactions";

export default async function Page(
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;

  return (
    <div>
      <PostMeta postId={postId} />

      {/* <PostReactions /> */}

      {/* 추후 개발 */}
      {/* <Comments /> */}
    </div>
  );
}