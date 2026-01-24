export default async function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;

  return <div>글 상세 페이지 - ID: {postId}</div>;
}