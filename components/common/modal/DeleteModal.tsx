import ConfirmModal from './ConfirmModal';

type DeleteModalProps = {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  className?: string;
};

export default function DeleteModal({
  title,
  message,
  isOpen,
  onClose,
  onDelete,
  className,
}: DeleteModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onDelete}
      title={title}
      message={message}
      className={className}
    />
  );
}
