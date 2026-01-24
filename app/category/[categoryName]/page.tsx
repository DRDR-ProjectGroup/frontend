import PostListWrap from "@/components/posts/PostListWrap";

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