import Delete from './Delete';
import Edit from './Edit';
import Notice from './Notice';

export default function PostOwnerActions({ postId }: { postId: number }) {
  return (
    <div className="flex items-center gap-2">
      <Edit postId={postId} />
      <Delete postId={postId} />

      <Notice postId={postId} />
    </div>
  );
}
