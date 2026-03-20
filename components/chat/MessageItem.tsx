import UserChip from '@/components/common/UserChip';
import { useAuthStore } from '@/lib/store/authStore';
import { formatTimeStampToHHMM } from '@/lib/utils/formatTime';
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
    <div className="flex items-center gap-4">
      <UserChip
        userId={memberId}
        name={nickname}
        textColor={isMyMessage ? 'text-primitive-green' : 'text-text-third'}
      />
      {/* <span className="text-[10px] text-primitive-grayText">
          {formatTimeStampToHHMM(timestamp)}
        </span> */}
      <p className="text-sm text-text-second">{message}</p>
    </div>
  );
}
