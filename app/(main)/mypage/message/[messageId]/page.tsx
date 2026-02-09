import MessageDetail from '../MessageDetail';

export default async function Page({
  params,
}: {
  params: Promise<{ messageId: string }>;
}) {
  const { messageId } = await params;
  return <MessageDetail isModal={false} messageId={messageId} />;
}
