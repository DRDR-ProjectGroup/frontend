import { useState } from 'react';
import Button from '../ui/Button';
import InputText from '../ui/InputText';
import MessageItem from './MessageItem';
import { useChat } from '@/hooks/useChat';

export default function ChatPanel() {
  const [chat, setChat] = useState('');
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex-1 rounded-md border border-primitive-grayPrimary p-4 flex flex-col">
      <div className="pb-4 pt-4 overflow-y-auto flex-1 flex flex-col-reverse gap-2">
        {messages.map((message) => (
          <MessageItem
            key={message.timestamp}
            memberId={message.memberId}
            nickname={message.nickname}
            message={message.message}
            timestamp={message.timestamp}
          />
        ))}
      </div>
      <div className="flex gap-2 pt-4 h-15 border-t border-primitive-grayPrimary">
        <InputText
          name="chat"
          placeholder="채팅을 입력해주세요."
          className="flex-1 h-full"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
        />
        <Button
          variant="primary"
          size="sm"
          className="h-full"
          onClick={() => sendMessage(chat)}
          disabled={!chat}
        >
          전송
        </Button>
      </div>
    </div>
  );
}
