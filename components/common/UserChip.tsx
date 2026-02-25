import { useEffect, useRef, useState } from 'react';
import Popover from '../ui/Popover';
import { TbMessageChatbot } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import MessageSendForm from '../message/MessageSendForm';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { AuthorStatus } from '@/types/api/author';
import { twMerge } from 'tailwind-merge';

interface UserChipProps {
  status?: AuthorStatus;
  icon?: React.ReactNode;
  userId: string;
  name: string;
  className?: string;
}

export default function UserChip({
  status = 'ACTIVE',
  icon,
  userId,
  name,
  className,
}: UserChipProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenMessageSendForm, setIsOpenMessageSendForm] = useState(false);
  const { isLoggedIn, userId: loggedInUserId } = useAuthStore();

  useEffect(() => {
    if (!isOpenPopover) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpenPopover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenPopover]);

  const handleSendMessage = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요.');
      return;
    }
    setIsOpenMessageSendForm(true);
    setIsOpenPopover(false);
  };

  const renderMenuItem = () => {
    if (isLoggedIn && loggedInUserId === userId) {
      return (
        <li
          className="flex items-center gap-2 hover:bg-primitive-graySecond px-2 py-1 cursor-pointer leading-none"
          onClick={() => router.push('/mypage/info')}
        >
          <CgProfile className="w-4 h-4" />내 정보 보기
        </li>
      );
    }

    if (status === 'BLOCKED') {
      return (
        <li className="flex items-center gap-2 px-2 py-1 leading-none">
          차단된 회원입니다.
        </li>
      );
    }

    if (status === 'DELETED') {
      return (
        <li className="flex items-center gap-2 px-2 py-1 leading-none">
          탈퇴한 회원입니다.
        </li>
      );
    }

    return (
      <li
        className="flex items-center gap-2 hover:bg-primitive-graySecond px-2 py-1 cursor-pointer leading-none"
        onClick={handleSendMessage}
      >
        <TbMessageChatbot className="w-4 h-4" />
        쪽지 보내기
      </li>
    );
  };

  return (
    <div className="relative inline-flex items-center justify-center gap-2">
      {icon}
      <span
        className={twMerge(
          'text-sm font-medium text-text-third truncate hover:underline cursor-pointer',
          className,
        )}
        onClick={() => setIsOpenPopover(true)}
      >
        {name}
      </span>
      {isOpenPopover && (
        <Popover
          className="absolute top-[20px] left-0 z-10 w-[130px] border border-primitive-graySecond"
          ref={ref}
        >
          <ul className="text-left text-xs">{renderMenuItem()}</ul>
        </Popover>
      )}
      {isOpenMessageSendForm && (
        <MessageSendForm
          isOpen={isOpenMessageSendForm}
          mode="send"
          receiverId={userId}
          name={name}
          onCancel={() => setIsOpenMessageSendForm(false)}
        />
      )}
    </div>
  );
}
