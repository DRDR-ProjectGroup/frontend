import Comments from "@/components/posts/detail/Comments";
import PostMeta from "@/components/posts/detail/PostMeta";
import PostReactions from "@/components/posts/detail/PostReactions";

export default async function Page(
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;

  return (
    <div>
      {/* 게시글 메타 정보 */}
      <PostMeta postId={postId} />

      {/* 좋아요, 싫어요 */}
      <PostReactions postId={postId} />

      {/* 댓글 */}
      {/* <Comments /> */}
    </div>
  );
}