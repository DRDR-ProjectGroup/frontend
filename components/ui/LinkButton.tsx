import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { LinkHTMLAttributes, ReactNode } from 'react';

// primary초록 / secondary검정 / tertiary / disabled회색
type LinkButtonProps = LinkHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function LinkButton({
  variant = 'primary',
  children,
  className,
  disabled = false,
  ...props
}: LinkButtonProps) {
  const base =
    'inline-flex items-center justify-center px-4 py-2 text-sm rounded-md cursor-pointer';
  const variants: Record<NonNullable<LinkButtonProps['variant']>, string> = {
    primary:
      'bg-primitive-green text-primitive-white hover:bg-primitive-green/90',
    secondary:
      'bg-primitive-blackPrimary text-primitive-white hover:bg-primitive-blackPrimary/90',
    tertiary:
      'bg-primitive-white border border-primitive-graySecond text-primitive-blackPrimary hover:bg-primitive-graySecond/20',
    icon: 'w-9 h-9 bg-transparent border-none hover:bg-primitive-graySecond/50 p-0',
  };

  const disabledStyle = 'pointer-events-none opacity-50 cursor-not-allowed';

  return (
    <Link
      {...props}
      href={props.href as string}
      className={twMerge(
        base,
        variants[variant],
        className,
        disabled && disabledStyle,
      )}
    >
      {children}
    </Link>
  );
}
