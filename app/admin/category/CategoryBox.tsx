import Button from '@/components/ui/Button';
import { GroupData } from '@/types/api/category';
import { useState } from 'react';
import ModalCategoryAdd from './ModalCategoryAdd';
import ModalGroupDelete from './ModalGroupDelete';
import ModalCategoryDelete from './ModalCategoryDelete';
import ModalCategoryEdit from './ModalCategoryEdit';
import ModalGroupEdit from './ModalGroupEdit';

interface CategoryBoxProps {
  groupAndCategoryData: GroupData;
}

export type ModalAction =
  | { type: 'ADD_CATEGORY'; groupId: number }
  | { type: 'UPDATE_GROUP'; groupId: number }
  | { type: 'DELETE_GROUP'; groupId: number }
  | { type: 'UPDATE_CATEGORY'; groupId: number; categoryId: number }
  | { type: 'DELETE_CATEGORY'; categoryId: number };

export default function CategoryBox({
  groupAndCategoryData,
}: CategoryBoxProps) {
  const [modal, setModal] = useState<ModalAction | null>(null);

  return (
    <div className="rounded-md overflow-hidden border border-primitive-white shadow-categoryBox">
      <div className="px-6 py-4 flex items-center justify-between border-b border-primitive-white bg-primitive-grayWeakest">
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
            onClick={() =>
              setModal({
                type: 'ADD_CATEGORY',
                groupId: groupAndCategoryData.groupId,
              })
            }
          >
            카테고리 추가
          </Button>
          {/* 그룹 수정 */}
          <Button
            variant="tertiary"
            size="sm"
            onClick={() =>
              setModal({
                type: 'UPDATE_GROUP',
                groupId: groupAndCategoryData.groupId,
              })
            }
          >
            수정
          </Button>
          {/* 그룹 삭제 */}
          <Button
            variant="warning"
            size="sm"
            onClick={() =>
              setModal({
                type: 'DELETE_GROUP',
                groupId: groupAndCategoryData.groupId,
              })
            }
          >
            삭제
          </Button>
        </div>
      </div>
      <table className="w-full text-xs text-center text-text-second">
        <colgroup>
          <col className="w-1/4" />
          <col className="w-1/4" />
          <col className="w-1/4" />
          <col className="w-1/4" />
        </colgroup>
        <thead>
          <tr className="h-10 bg-primitive-grayWeakest">
            <th className="px-6">categoryId</th>
            <th className="px-6">categoryName</th>
            <th className="px-6">categoryAddress</th>
            <th className="px-6">관리</th>
          </tr>
        </thead>
        <tbody className="bg-primitive-white">
          {groupAndCategoryData.categories.map((category) => (
            <tr key={category.categoryId} className="h-15">
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
                      setModal({
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
                      setModal({
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
      {/* 그룹 수정 */}
      {modal?.type === 'UPDATE_GROUP' && (
        <ModalGroupEdit
          groupId={modal.groupId}
          onClose={() => setModal(null)}
        />
      )}
      {/* 그룹 삭제 */}
      {modal?.type === 'DELETE_GROUP' && (
        <ModalGroupDelete
          groupId={modal.groupId}
          onClose={() => setModal(null)}
        />
      )}
      {/* 카테고리 추가 */}
      {modal?.type === 'ADD_CATEGORY' && (
        <ModalCategoryAdd
          groupId={modal.groupId}
          onClose={() => setModal(null)}
        />
      )}
      {/* 카테고리 수정 */}
      {modal?.type === 'UPDATE_CATEGORY' && (
        <ModalCategoryEdit
          groupId={modal.groupId}
          categoryId={modal.categoryId}
          onClose={() => setModal(null)}
        />
      )}
      {/* 카테고리 삭제 */}
      {modal?.type === 'DELETE_CATEGORY' && (
        <ModalCategoryDelete
          categoryId={modal.categoryId}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
