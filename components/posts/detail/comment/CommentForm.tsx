'use client';

import LinkButton from '@/components/ui/LinkButton';
import { useAuthStore } from '@/lib/store/authStore';
import ReplyForm from './ReplyForm';

export default function CommentForm({ postId }: { postId: number }) {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="mt-8">
      {isLoggedIn ? (
        <div>
          <strong className="block mb-4 text-lg font-semibold">
            댓글 작성
          </strong>
          <ReplyForm
            postId={postId}
            parentCommentId={null}
            onCancel={() => {}}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 p-6 bg-primitive-grayWeakest rounded-md">
          <p className="text-sm text-text-primary">
            로그인 후 댓글을 작성할 수 있습니다.
          </p>
          <LinkButton
            variant="secondary"
            href={`/login?redirect=/posts/${postId}`}
          >
            로그인
          </LinkButton>
        </div>
      )}
    </div>
  );
}
