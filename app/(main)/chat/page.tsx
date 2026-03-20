import { Heading } from '@/components/ui/Heading';
import ChatWrap from '@/components/chat/ChatWrap';

export default function Page() {
  return (
    <div>
      <Heading level={1}>채팅방</Heading>
      <ChatWrap />
    </div>
  );
}
