import { Heading } from '@/components/ui/Heading';
import SignupForm from './SignupForm';

export default function Page() {
  return (
    <div>
      <Heading level={1} className="mb-8 text-center">
        Sign Up
      </Heading>

      <SignupForm />
    </div>
  );
}
