import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import InputText from '../ui/InputText';
import MessageItem from './MessageItem';
import { useChatMessages } from '@/hooks/chat/useChatMessages';
import BottomButton from '../common/BottomButton';
import { DateDivider } from '@/lib/utils/DateDivider';

export default function ChatPanel() {
  const [chat, setChat] = useState('');
  const { messages, sendMessage } = useChatMessages();

  // (mac환경) 한글 입력(IME) 조합 중인지 여부 (Enter 중복 전송 방지)
  const [isComposing, setIsComposing] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    // el.scrollTop(현재 스크롤 위치), el.scrollHeight(전체 높이), el.clientHeight(보이는 영역 높이)

    if (isAtBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!chat) return;
    sendMessage(chat);
    setChat('');
  };

  return (
    <div className="h-full relative flex-1 rounded-md border border-primitive-grayPrimary p-4 flex flex-col">
      <div className="flex-1 h-full relative overflow-hidden">
        <div ref={containerRef} className="h-full overflow-y-auto">
          {/* 채팅 메시지 목록 : 날짜 구분 DateDivider 추가 */}
          <div className="pb-4 pt-4 min-h-full flex flex-col gap-2 justify-end">
            {messages.map((message, index) => {
              const currentDate = new Date(message.timestamp).toDateString();

              const prevMessage = messages[index - 1];
              const prevDate = prevMessage
                ? new Date(prevMessage.timestamp).toDateString()
                : null;

              const showDateDivider = currentDate !== prevDate;

              return (
                <div key={`${message.timestamp}-${index}`}>
                  {showDateDivider && (
                    <DateDivider timestamp={message.timestamp} />
                  )}

                  <MessageItem
                    memberId={message.memberId}
                    nickname={message.nickname}
                    message={message.message}
                    timestamp={message.timestamp}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <BottomButton containerRef={containerRef} />
      </div>
      <div className="flex gap-2 pt-4 h-15 border-t border-primitive-grayPrimary">
        <InputText
          name="chat"
          placeholder="채팅을 입력해주세요."
          className="flex-1 h-full"
          value={chat}
          autoComplete="off"
          onChange={(e) => setChat(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (isComposing) return;
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button
          variant="primary"
          size="sm"
          className="h-full"
          onClick={handleSendMessage}
          disabled={!chat}
        >
          전송
        </Button>
      </div>
    </div>
  );
}
