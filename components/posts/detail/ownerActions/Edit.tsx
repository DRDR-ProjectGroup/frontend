import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function Edit({ postId }: { postId: string }) {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/posts/${postId}/edit`);
  };

  return (
    <Button size="sm" variant="primary" onClick={handleEdit}>
      수정
    </Button>
  );
}
