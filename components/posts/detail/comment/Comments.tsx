import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default function Comments({ postId }: { postId: number }) {
  return (
    <div className="py-8">
      <CommentList postId={postId} />
      <CommentForm postId={postId} />
    </div>
  );
}
