import Comments from "./Comments.client";
import PostMeta from "./PostMeta.server";
import PostReactions from "./PostReactions.client";

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