import { Heading } from '@/components/ui/Heading';
import LoginForm from './LoginForm';

export default function Page() {
  return (
    <div>
      <Heading level={1} className="mb-8 text-center">
        Login
      </Heading>

      <LoginForm />
    </div>
  );
}
