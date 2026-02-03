import ConfirmModal from './ConfirmModal';

type DeleteModalProps = {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteModal({
  title,
  message,
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onDelete}
      title={title}
      message={message}
    />
  );
}
