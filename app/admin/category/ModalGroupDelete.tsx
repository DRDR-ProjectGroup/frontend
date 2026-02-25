import DeleteModal from '@/components/common/modal/DeleteModal';
import { useDeleteGroupMutation } from '@/query/admin/category/useCategoryMutations';

interface ModalGroupDeleteProps {
  groupId: number;
  onClose: () => void;
}

export default function ModalGroupDelete({
  groupId,
  onClose,
}: ModalGroupDeleteProps) {
  const { mutate: deleteGroup } = useDeleteGroupMutation();
  const handleDeleteGroup = () => {
    deleteGroup(
      {
        groupId: groupId.toString(),
      },
      {
        onSuccess: () => {
          onClose();
          alert('그룹 삭제 성공');
        },
        onError: (error) => {
          alert(error.message);
        },
      },
    );
  };
  return (
    <DeleteModal
      title="그룹 삭제"
      message="그룹을 삭제하시겠습니까?"
      isOpen={true}
      onClose={onClose}
      onDelete={handleDeleteGroup}
    />
  );
}
