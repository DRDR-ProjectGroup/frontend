import LinkButton from "@/components/ui/LinkButton";

export default function BeforeLogin() {
  return (
    <>
      <LinkButton href="/login" variant="tertiary">
        Login
      </LinkButton>
      <LinkButton href="/signup" variant="secondary">
        Sign Up
      </LinkButton>
    </>
  );
}