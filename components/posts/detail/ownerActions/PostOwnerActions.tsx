import Delete from './Delete';
import Edit from './Edit';
import Notice from './Notice';
import { useAuthStore } from '@/lib/store/authStore';

export default function PostOwnerActions({ postId }: { postId: number }) {
  const userRole = useAuthStore((state) => state.role);
  return (
    <div className="flex items-center gap-2">
      <Edit postId={postId} />
      <Delete postId={postId} />
      {userRole === 'ROLE_ADMIN' && <Notice postId={postId} />}
    </div>
  );
}
