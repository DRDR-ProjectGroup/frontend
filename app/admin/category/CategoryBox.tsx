import Button from '@/components/ui/Button';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteGroupMutation,
  useUpdateCategoryMutation,
  useUpdateGroupMutation,
} from '@/query/category/useCategoryMutations';
import { GroupData } from '@/types/api/category';
import { useState } from 'react';
import { CategoryActionModal } from './CategoryActionModal';
import { ModalAction } from './CategoryActionModal';

interface CategoryBoxProps {
  groupAndCategoryData: GroupData;
}

export default function CategoryBox({
  groupAndCategoryData,
}: CategoryBoxProps) {
  const { mutate: updateGroup } = useUpdateGroupMutation();
  const { mutate: deleteGroup } = useDeleteGroupMutation();
  const { mutate: addCategory } = useAddCategoryMutation();
  const { mutate: updateCategory } = useUpdateCategoryMutation();
  const { mutate: deleteCategory } = useDeleteCategoryMutation();

  const [modalAction, setModalAction] = useState<ModalAction | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    if (!modalAction) return;

    switch (modalAction.type) {
      case 'UPDATE_GROUP':
        updateGroup({
          groupId: modalAction.groupId.toString(),
          groupName: inputValue,
        });
        break;
      case 'DELETE_GROUP':
        deleteGroup({
          groupId: modalAction.groupId.toString(),
        });
        break;
      case 'ADD_CATEGORY':
        addCategory({
          groupId: modalAction.groupId.toString(),
          categoryName: inputValue,
          categoryAddress: inputValue,
        });
        break;
      case 'UPDATE_CATEGORY':
        updateCategory({
          categoryId: modalAction.categoryId.toString(),
          categoryName: inputValue,
          categoryAddress: inputValue,
          groupId: modalAction.groupId.toString(),
        });
        break;
      case 'DELETE_CATEGORY':
        deleteCategory({
          categoryId: modalAction.categoryId.toString(),
        });
        break;
    }
    setModalAction(null);
    setInputValue('');
  };

  return (
    <div className="rounded-md overflow-hidden border border-primitive-white shadow-categoryBox">
      <div className="px-6 py-4 flex items-center justify-between border-b border-primitive-white">
        <div className="flex items-center gap-2">
          <strong className="text-sm">{groupAndCategoryData.groupName}</strong>
          <span className="text-xs text-text-third">
            (id : {groupAndCategoryData.groupId})
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* 카테고리 추가 */}
          <Button
            variant="tertiary"
            size="sm"
            className="border-color-primitive-green text-primitive-green"
            onClick={() => {
              setModalAction({
                type: 'ADD_CATEGORY',
                groupId: groupAndCategoryData.groupId,
              });
            }}
          >
            카테고리 추가
          </Button>
          {/* 그룹 수정 */}
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => {
              setModalAction({
                type: 'UPDATE_GROUP',
                groupId: groupAndCategoryData.groupId,
              });
            }}
          >
            수정
          </Button>
          {/* 그룹 삭제 */}
          <Button
            variant="warning"
            size="sm"
            onClick={() => {
              setModalAction({
                type: 'DELETE_GROUP',
                groupId: groupAndCategoryData.groupId,
              });
            }}
          >
            삭제
          </Button>
        </div>
      </div>
      <table className="w-full text-xs text-left text-text-second">
        <colgroup>
          <col className="w-1/4" />
          <col className="w-1/4" />
          <col className="w-1/4" />
          <col className="w-1/4" />
        </colgroup>
        <thead>
          <tr className="h-10">
            <th className="px-6">categoryId</th>
            <th className="px-6">categoryName</th>
            <th className="px-6">categoryAddress</th>
            <th className="px-6">
              <span className="sr-only">버튼</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-primitive-white">
          {groupAndCategoryData.categories.map((category) => (
            <tr className="h-15">
              <td className="px-6">{category.categoryId}</td>
              <td className="px-6">{category.categoryName}</td>
              <td className="px-6">{category.categoryAddress}</td>
              <td>
                <div className="flex items-center justify-center gap-2">
                  {/* 카테고리 수정 */}
                  <Button
                    variant="tertiary"
                    size="sm"
                    onClick={() => {
                      setModalAction({
                        type: 'UPDATE_CATEGORY',
                        groupId: groupAndCategoryData.groupId,
                        categoryId: category.categoryId,
                      });
                    }}
                  >
                    수정
                  </Button>
                  {/* 카테고리 삭제 */}
                  <Button
                    variant="tertiary"
                    className="border-none text-primitive-grayWeakest bg-primitive-grayPrimary hover:bg-primitive-blackPrimary/50"
                    size="sm"
                    onClick={() => {
                      setModalAction({
                        type: 'DELETE_CATEGORY',
                        categoryId: category.categoryId,
                      });
                    }}
                  >
                    삭제
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal : 그룹 수정/삭제, 카테고리 추가/수정/삭제 */}
      <CategoryActionModal
        action={modalAction}
        inputValue={inputValue}
        onChangeInput={setInputValue}
        onClose={() => setModalAction(null)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
