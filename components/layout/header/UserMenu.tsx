import LinkButton from '@/components/ui/LinkButton';

export default function UserMenu() {
  return (
    <div className="flex gap-2">
      <LinkButton href="/login" variant="tertiary">
        Login
      </LinkButton>
      <LinkButton href="/signup" variant="secondary">
        Sign Up
      </LinkButton>
    </div>
  );
}
