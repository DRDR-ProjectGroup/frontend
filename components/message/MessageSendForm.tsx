import Button from '@/components/ui/Button';
import { IoMdClose } from 'react-icons/io';
import InputText from '@/components/ui/InputText';
import Textarea from '../ui/Textarea';
import Modal from '../common/modal/Modal';
import { useState } from 'react';
import { useSendMessageMutation } from '@/query/message/useMessageMutations';

interface MessageSendFormProps {
  isOpen: boolean;
  mode: 'send' | 'receive';
  receiverId: string;
  name: string;
  content?: string;
  onCancel: () => void;
}

export default function MessageSendForm({
  isOpen,
  mode,
  receiverId,
  name,
  content,
  onCancel,
}: MessageSendFormProps) {
  const [textareaValue, setTextareaValue] = useState(content || '');
  const { mutate: sendMessage, isPending, isError } = useSendMessageMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(
      {
        receiverId: Number(receiverId),
        content: textareaValue,
      },
      {
        onSuccess: () => {
          alert('쪽지 보내기 성공');
          onCancel();
        },
        onError: (error) => {
          alert('쪽지 보내기 실패');
          console.error(error.message);
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div>
        <header className="flex items-center justify-between pb-2 border-b border-primitive-grayPrimary">
          <h2>{mode === 'send' ? '쪽지 보내기' : '쪽지 받은 페이지'}</h2>
          <Button variant="icon" onClick={onCancel}>
            <IoMdClose className="w-4 h-4" />
          </Button>
        </header>
        <main className="pt-4">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm text-text-second mb-1">
                {mode === 'send' ? '받는이' : '보낸이'}
              </label>
              <InputText id="name" value={name} readOnly />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm text-text-second mb-1"
              >
                내용
              </label>
              {mode === 'send' ? (
                <>
                  <Textarea
                    id="content"
                    placeholder="쪽지 내용을 입력 해주세요."
                    className="h-[178px] resize-none text-sm"
                    value={textareaValue}
                    maxLength={500}
                    onChange={(e) => setTextareaValue(e.target.value)}
                  />
                  <div className="text-right">
                    <span className="text-sm text-text-second">
                      {textareaValue.length}
                      <span className="text-primitive-grayText"> / 500</span>
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-sm">{textareaValue}</p>
              )}
            </div>
            <footer className="flex items-center justify-center gap-2">
              {mode === 'send' ? (
                <>
                  <Button variant="tertiary" type="button" onClick={onCancel}>
                    취소
                  </Button>
                  <Button variant="primary" type="submit" disabled={isPending}>
                    {isPending ? '쪽지 보내는 중...' : '쪽지 보내기'}
                  </Button>
                </>
              ) : (
                <Button variant="primary" type="button" onClick={onCancel}>
                  확인
                </Button>
              )}
            </footer>
          </form>
        </main>
      </div>
    </Modal>
  );
}
