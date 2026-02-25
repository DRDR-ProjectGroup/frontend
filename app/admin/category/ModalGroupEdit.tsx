import Modal from '@/components/common/modal/Modal';
import Button from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';
import { useUpdateGroupMutation } from '@/query/admin/category/useCategoryMutations';
import { useState } from 'react';

interface ModalGroupEditProps {
  groupId: number;
  onClose: () => void;
}

export default function ModalGroupEdit({
  groupId,
  onClose,
}: ModalGroupEditProps) {
  const [groupName, setGroupName] = useState('');
  const { mutate: updateGroup } = useUpdateGroupMutation();
  const handleUpdateGroup = () => {
    updateGroup(
      {
        groupId: groupId.toString(),
        groupName,
      },
      {
        onSuccess: () => {
          onClose();
          alert('그룹 수정 성공');
        },
        onError: (error) => {
          console.error(error.message);
        },
      },
    );
  };
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div>
        <Heading level={1} className="mb-4 text-lg">
          그룹 수정
        </Heading>
        <div className="space-y-2">
          <div>
            <p className="text-sm text-text-second pb-2">그룹 이름</p>
            <InputText
              placeholder="그룹 이름을 입력해주세요."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="tertiary" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleUpdateGroup}>
            수정
          </Button>
        </div>
      </div>
    </Modal>
  );
}
