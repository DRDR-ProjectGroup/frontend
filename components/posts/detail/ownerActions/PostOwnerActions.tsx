import Delete from './Delete';
import Edit from './Edit';

export default function PostOwnerActions({ postId }: { postId: string }) {
  return (
    <div className="flex items-center gap-2">
      <Edit />
      <Delete postId={postId} />

      {/* <Notice /> */}
    </div>
  );
}
