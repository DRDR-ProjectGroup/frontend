import UserChip from '@/components/common/UserChip';
import { useAuthStore } from '@/lib/store/authStore';
import { ReceiveChatMessageResponse } from '@/types/socket/chat';

export default function MessageItem({
  memberId,
  nickname,
  message,
  timestamp,
}: ReceiveChatMessageResponse) {
  const { userId: loggedInUserId } = useAuthStore();
  const isMyMessage = loggedInUserId === memberId;
  return (
    <div className="flex items-baseline gap-2">
      <div
        className={`px-2 rounded-md ${isMyMessage ? 'bg-primitive-green' : 'bg-primitive-grayPrimary'}`}
      >
        <UserChip
          userId={memberId}
          name={nickname}
          textColor={isMyMessage ? 'text-primitive-white' : 'text-text-third'}
        />
      </div>
      <p className="text-sm text-primitive-blackPrimary">{message}</p>
    </div>
  );
}
