import ConfirmModal from './ConfirmModal';

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onDelete}
      title="게시글 삭제 확인"
      message={`정말로 이 게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다.`}
    />
  );
}
