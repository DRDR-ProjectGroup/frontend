import { twMerge } from 'tailwind-merge';
import { ButtonHTMLAttributes, ReactNode } from 'react';

// primary초록 / secondary검정 / tertiary / disabled회색
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'icon';
  size?: 'sm' | 'md' | 'lg';
};

export default function Button({
  size = 'md',
  variant = 'primary',
  type = 'button',
  children,
  className,
  disabled = false,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-4 py-2 text-sm rounded-md cursor-pointer box-sizing-border';
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-primitive-green text-primitive-white hover:bg-primitive-green/90',
    secondary:
      'bg-primitive-blackPrimary text-primitive-white hover:bg-primitive-blackPrimary/90',
    tertiary:
      'bg-primitive-white border border-primitive-grayPrimary text-primitive-blackPrimary hover:bg-primitive-graySecond/20',
    warning: 'bg-primitive-red text-primitive-white hover:bg-primitive-red/90',
    icon: 'w-9 h-9 bg-transparent border-none hover:bg-primitive-graySecond/50 p-0',
  };

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'h-7 px-3 py-1.5 text-xs',
    md: 'h-9 px-5 py-2 text-sm',
    lg: 'h-11 px-7 py-3 text-base',
  };

  const disabledStyle = 'pointer-events-none opacity-50 cursor-not-allowed';

  return (
    <button
      type={type}
      className={twMerge(
        base,
        sizes[size],
        variants[variant],
        className,
        disabled && disabledStyle,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
