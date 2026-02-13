import DeleteModal from '@/components/common/modal/DeleteModal';
import { useDeleteCategoryMutation } from '@/query/admin/category/useCategoryMutations';

interface ModalCategoryDeleteProps {
  categoryId: number;
  onClose: () => void;
}

export default function ModalCategoryDelete({
  categoryId,
  onClose,
}: ModalCategoryDeleteProps) {
  const { mutate: deleteCategory } = useDeleteCategoryMutation();
  const handleDeleteCategory = () => {
    deleteCategory(
      {
        categoryId: categoryId.toString(),
      },
      {
        onSuccess: () => {
          onClose();
          alert('카테고리 삭제 성공');
        },
        onError: (error) => {
          alert(error.message || '카테고리 삭제 실패');
        },
      },
    );
  };
  return (
    <DeleteModal
      title="카테고리 삭제"
      message="카테고리를 삭제하시겠습니까?"
      isOpen={true}
      onClose={onClose}
      onDelete={handleDeleteCategory}
    />
  );
}
