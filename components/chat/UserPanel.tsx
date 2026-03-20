import UserChip from '@/components/common/UserChip';
import { useChatUsers } from '@/hooks/chat/useChatUsers';

export default function UserPanel() {
  const { users } = useChatUsers();

  return (
    <div className="flex flex-col w-64 rounded-md border border-primitive-grayPrimary p-4">
      <div className="flex items-center justify-center border-b border-primitive-grayPrimary pb-2 shrink-0">
        <span className="text-sm font-medium">접속자 목록</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div key={user.memberId}>
              <UserChip userId={user.memberId} name={user.nickname} />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-sm text-primitive-grayText">
              접속자가 없습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
