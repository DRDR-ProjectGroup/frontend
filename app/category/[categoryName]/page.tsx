import PostListWrap from "@/components/posts/list/PostListWrap";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const { categoryName } = await params;
  return (
    <PostListWrap category={categoryName} />
  );
}