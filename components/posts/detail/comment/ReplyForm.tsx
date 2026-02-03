import Button from '@/components/ui/Button';
import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from '@/query/comment/useCommentMutations';
import { useState } from 'react';

type ReplyFormProps = {
  mode?: 'create' | 'update';
  postId: number;
  commentId: number;
  parentCommentId: number | null;
  onCancel: () => void;
  initialContent?: string;
};

export default function ReplyForm({
  mode = 'create',
  postId,
  commentId,
  parentCommentId,
  onCancel,
  initialContent,
}: ReplyFormProps) {
  const [content, setContent] = useState(initialContent ?? '');
  const { mutate: createCommentMutate } = useCreateCommentMutation();
  const { mutate: updateCommentMutate } = useUpdateCommentMutation();

  const handleSubmit = () => {
    const onSuccess = () => {
      onCancel();
      setContent('');
    };

    if (mode === 'create') {
      createCommentMutate({ postId, parentCommentId, content }, { onSuccess });
    } else {
      updateCommentMutate({ postId, commentId, content }, { onSuccess });
    }
  };

  return (
    <div className="pb-2">
      <textarea
        className="border-primitive-grayPrimary h-26 w-full rounded-md border p-3 text-sm"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-end gap-2">
        <Button
          variant={mode === 'create' ? 'primary' : 'secondary'}
          size="sm"
          onClick={handleSubmit}
        >
          {mode === 'create' ? '등록' : '수정'}
        </Button>
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => {
            setContent('');
            onCancel();
          }}
        >
          취소
        </Button>
      </div>
    </div>
  );
}
