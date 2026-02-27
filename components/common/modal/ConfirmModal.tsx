import Modal from './Modal';
import Button from '@/components/ui/Button';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  className?: string;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  className,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-text-second mt-3 whitespace-pre-line">
        {message}
      </p>
      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={onClose} variant="secondary">
          취소
        </Button>
        <Button onClick={onConfirm} variant="warning">
          확인
        </Button>
      </div>
    </Modal>
  );
}
