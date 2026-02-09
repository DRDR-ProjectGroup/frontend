import Modal from '@/components/common/modal/Modal';
import Button from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';

export type ModalAction =
  | { type: 'ADD_CATEGORY'; groupId: number }
  | { type: 'UPDATE_GROUP'; groupId: number }
  | { type: 'DELETE_GROUP'; groupId: number }
  | { type: 'UPDATE_CATEGORY'; groupId: number; categoryId: number }
  | { type: 'DELETE_CATEGORY'; categoryId: number };

const MODAL_TEXT = {
  ADD_CATEGORY: {
    title: '카테고리 추가',
    confirm: '추가',
    placeholder: '카테고리 이름을 입력해주세요.',
    needInput: true,
  },
  UPDATE_GROUP: {
    title: '그룹 수정',
    confirm: '수정',
    placeholder: '그룹 이름을 입력해주세요.',
    needInput: true,
  },
  UPDATE_CATEGORY: {
    title: '카테고리 수정',
    confirm: '수정',
    placeholder: '카테고리 이름을 입력해주세요.',
    needInput: true,
  },
  DELETE_GROUP: {
    title: '그룹 삭제',
    confirm: '삭제',
    needInput: false,
  },
  DELETE_CATEGORY: {
    title: '카테고리 삭제',
    confirm: '삭제',
    needInput: false,
  },
} as const;

interface Props {
  action: ModalAction | null;
  inputValue: string;
  onChangeInput: (v: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export function CategoryActionModal({
  action,
  inputValue,
  onChangeInput,
  onClose,
  onConfirm,
}: Props) {
  if (!action) return null;

  const config = MODAL_TEXT[action.type];

  return (
    <Modal isOpen onClose={onClose}>
      <div className="space-y-4">
        <Heading level={2} className="text-md">
          {config.title}
        </Heading>

        {config.needInput ? (
          <InputText
            placeholder={config.placeholder}
            value={inputValue}
            onChange={(e) => onChangeInput(e.target.value)}
          />
        ) : (
          <p className="text-sm text-text-second">정말 삭제하시겠습니까?</p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="tertiary" onClick={onClose}>
            취소
          </Button>
          <Button
            variant={config.needInput ? 'primary' : 'warning'}
            onClick={onConfirm}
          >
            {config.confirm}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
