import Delete from './Delete';
import Edit from './Edit';
import Notice from './Notice';
import { useAuthStore } from '@/lib/store/authStore';

interface PostOwnerActionsProps {
  postId: number;
  postAuthorId: number;
  isNotice: boolean;
}

export default function PostOwnerActions({
  postId,
  postAuthorId,
  isNotice,
}: PostOwnerActionsProps) {
  const userId = useAuthStore((state) => state.userId);
  const userRole = useAuthStore((state) => state.role);
  return (
    <div className="flex items-center gap-2">
      {userId === postAuthorId.toString() && <Edit postId={postId} />}
      <Delete postId={postId} />
      {userRole === 'ROLE_ADMIN' && (
        <Notice postId={postId} isNotice={isNotice} />
      )}
    </div>
  );
}
