'use client';

import Button from '@/components/ui/Button';
import CategoryBox from './CategoryBox';
import { useGroupAndCategoryQuery } from '@/query/admin/category/useCategoryQuery';
import { useAddGroupMutation } from '@/query/admin/category/useCategoryMutations';
import Modal from '@/components/common/modal/Modal';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';
import { useState } from 'react';

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { mutate: addGroup } = useAddGroupMutation();
  const {
    data: groupAndCategory,
    isLoading,
    isError,
  } = useGroupAndCategoryQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!groupAndCategory?.data) return <div>카테고리 데이터가 없습니다.</div>;

  const groupAndCategoryData = groupAndCategory.data || [];
  const totalGroups = groupAndCategoryData.length;
  const totalCategories = groupAndCategoryData.reduce(
    (accumulatedValue, data) => accumulatedValue + data.categories.length,
    0,
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-text-third">
          총 <span>{totalGroups}</span>개의 그룹, <span>{totalCategories}</span>
          개의 카테고리
        </p>
        <Button
          variant="primary"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          그룹 추가
        </Button>
      </div>
      <div className="space-y-4">
        {groupAndCategoryData.map((group) => (
          <CategoryBox key={group.groupId} groupAndCategoryData={group} />
        ))}
      </div>
      {/* Modal : 그룹 추가 */}
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="space-y-4">
          <Heading level={2} className="text-md">
            그룹 추가
          </Heading>
          <InputText
            placeholder="그룹 이름을 입력해주세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="tertiary" onClick={() => setIsOpenModal(false)}>
              취소
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (inputValue.trim() === '') {
                  return alert('그룹 이름을 입력해주세요.');
                }
                addGroup(
                  { groupName: inputValue },
                  {
                    onSuccess: () => {
                      alert('그룹 추가 성공');
                      setIsOpenModal(false);
                      setInputValue('');
                    },
                    onError: () => {
                      alert('그룹 추가 실패');
                    },
                  },
                );
              }}
            >
              추가
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
