import Modal from '@/components/common/modal/Modal';
import Button from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';
import { useAddCategoryMutation } from '@/query/admin/category/useCategoryMutations';
import { useState } from 'react';

interface ModalCategoryAddProps {
  groupId: number;
  onClose: () => void;
}

export default function ModalCategoryAdd({
  groupId,
  onClose,
}: ModalCategoryAddProps) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryAddress, setCategoryAddress] = useState('');
  const { mutate: addCategory } = useAddCategoryMutation();

  const handleSubmit = () => {
    // 카테고리 주소 입력 시 영어 + 숫자 조합만 허용
    if (/^[a-zA-Z0-9]+$/.test(categoryAddress)) {
      handleAddCategory();
    } else {
      setCategoryAddress('');
      alert('카테고리 주소는 영어 + 숫자 조합만 허용입니다.');
    }
  };

  // 카테고리 추가
  const handleAddCategory = () => {
    addCategory(
      {
        groupId: groupId.toString(),
        categoryName,
        categoryAddress,
      },
      {
        onSuccess: () => {
          onClose();
          alert('카테고리 추가 성공');
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
        <Heading level={1} className="pb-4 text-lg">
          카테고리 추가
        </Heading>
        <div className="space-y-4">
          <div>
            <p className="text-text-primary pb-2">카테고리 이름</p>
            <InputText
              placeholder="카테고리 이름을 입력해주세요."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div>
            <p className="text-text-primary pb-2">
              카테고리 주소{' '}
              <span className="text-sm text-text-third font-bold">
                (영어 + 숫자 조합만 허용, 공백 불가)
              </span>
            </p>
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
          <Button variant="primary" onClick={handleSubmit}>
            추가
          </Button>
        </div>
      </div>
    </Modal>
  );
}
