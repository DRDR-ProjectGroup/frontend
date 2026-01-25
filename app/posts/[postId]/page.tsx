import Comments from "./Comments";
import PostMeta from "./PostMeta";
import PostReactions from "./PostReactions";

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