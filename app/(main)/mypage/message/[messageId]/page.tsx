import MessageDetail from '../MessageDetail';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ messageId: string }>;
  searchParams: Promise<{ type: 'inbox' | 'sent' }>;
}) {
  const { messageId } = await params;
  const { type } = await searchParams;
  return <MessageDetail isModal={false} messageId={messageId} boxType={type} />;
}
