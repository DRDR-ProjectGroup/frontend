import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils/formatDate';
import { CommentItem as CommentItemType } from '@/types/api/comment';
import ReplyForm from './ReplyForm';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';
import { RxCornerBottomLeft } from 'react-icons/rx';
import { useDeleteCommentMutation } from '@/query/comment/useCommentMutations';
import DeleteModal from '@/components/common/modal/DeleteModal';
import UserChip from '@/components/common/UserChip';

export default function CommentItem({
  postId,
  ...props
}: CommentItemType & { postId: number }) {
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const { isLoggedIn, userId } = useAuthStore();
  const { mutate: deleteCommentMutate } = useDeleteCommentMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { author, createdAt, content, child, commentId, parentComment } = props;

  if (!author) {
    return (
      <div className="border-t border-primitive-graySecond">
        <p className="text-xs py-4 text-text-third">삭제된 댓글입니다.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-primitive-graySecond">
      {/* 댓글 content */}
      <div className="py-2">
        <div className="flex items-baseline gap-2">
          <UserChip
            status={author?.status}
            userId={author?.memberId.toString()}
            name={author?.nickname}
            className="text-sm font-bold"
          />
          <span className="text-xs text-primitive-grayText">
            {formatDate(createdAt)}
          </span>
        </div>
        {isUpdateFormOpen ? (
          <ReplyForm
            mode="update"
            commentId={commentId}
            onCancel={() => setIsUpdateFormOpen(false)}
            postId={postId}
            parentCommentId={commentId}
            initialContent={content}
          />
        ) : (
          <div className="text-xs pt-2 whitespace-pre-wrap">
            {parentComment && (
              <UserChip
                status={parentComment.status}
                userId={parentComment.memberId.toString()}
                name={parentComment.nickname}
                className="text-primitive-grayText mr-2 font-medium"
              />
            )}
            {content}
          </div>
        )}
      </div>
      {/* 대댓글 작성 */}
      {isLoggedIn && (
        <div>
          {!isReplyFormOpen && !isUpdateFormOpen && (
            <div>
              <Button
                variant="tertiary"
                size="sm"
                className="text-xs border-none p-0 px-1 text-text-third"
                onClick={() => setIsReplyFormOpen((prev) => !prev)}
              >
                답글
              </Button>
              {isLoggedIn && userId && Number(userId) === author.memberId && (
                <>
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="text-xs border-none p-0 px-1 text-text-third"
                    onClick={() => setIsUpdateFormOpen((prev) => !prev)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="text-xs border-none p-0 px-1 text-text-third"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    삭제
                  </Button>
                </>
              )}
            </div>
          )}
          {isReplyFormOpen && (
            <ReplyForm
              mode="create"
              onCancel={() => setIsReplyFormOpen(false)}
              postId={postId}
              commentId={commentId}
              parentCommentId={commentId}
            />
          )}
        </div>
      )}
      {/* 대댓글 목록 */}
      {child && child.length > 0 && (
        <div className="relative ml-8">
          <RxCornerBottomLeft className="absolute top-4 -left-6 text-primitive-grayPrimary" />
          {child?.map((comment) => (
            <CommentItem key={comment.commentId} postId={postId} {...comment} />
          ))}
        </div>
      )}
      <DeleteModal
        title="댓글 삭제 확인"
        message="정말로 이 댓글을 삭제하시겠습니까? 삭제된 댓글은 복구할 수 없습니다."
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          deleteCommentMutate(
            { postId, commentId },
            {
              onSuccess: () => {
                setIsDeleteModalOpen(false);
                setIsReplyFormOpen(false);
                setIsUpdateFormOpen(false);
              },
            },
          );
        }}
      />
    </div>
  );
}
