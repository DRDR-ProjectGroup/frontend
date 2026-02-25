import Modal from '@/components/common/modal/Modal';
import Button from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';
import { useUpdateCategoryMutation } from '@/query/admin/category/useCategoryMutations';
import { useState } from 'react';

interface ModalCategoryEditProps {
  groupId: number;
  categoryId: number;
  onClose: () => void;
}

export default function ModalCategoryEdit({
  groupId,
  categoryId,
  onClose,
}: ModalCategoryEditProps) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryAddress, setCategoryAddress] = useState('');
  const { mutate: updateCategory } = useUpdateCategoryMutation();
  const handleUpdateCategory = () => {
    updateCategory(
      {
        groupId: groupId.toString(),
        categoryId: categoryId.toString(),
        categoryName,
        categoryAddress,
      },
      {
        onSuccess: () => {
          onClose();
          alert('카테고리 수정 성공');
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
          카테고리 수정
        </Heading>
        <div className="space-y-2">
          <div>
            <p className="text-sm text-text-second p-2">카테고리 이름</p>
            <InputText
              placeholder="카테고리 이름을 입력해주세요."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm text-text-second p-2">카테고리 주소</p>
            <InputText
              placeholder="카테고리 주소를 입력해주세요."
              value={categoryAddress}
              onChange={(e) => setCategoryAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="tertiary" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleUpdateCategory}>
            수정
          </Button>
        </div>
      </div>
    </Modal>
  );
}
