import { ReactNode } from 'react';

// primary초록 / secondary검정 / tertiary / disabled회색
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  variant = 'primary',
  children,
  className,
  disabled = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-4 py-2 text-sm rounded-md cursor-pointer';
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-primitive-green hover:bg-primitive-green/90',
    secondary:
      'bg-primitive-blackPrimary text-primitive-white hover:bg-primitive-blackPrimary/90',
    tertiary:
      'bg-primitive-white border border-primitive-graySecond hover:bg-primitive-graySecond/20',
  };

  const disabledStyle = 'pointer-events-none opacity-50 cursor-not-allowed';

  return (
    <button
      className={`${base} ${variants[variant]} ${className ?? ''} ${disabled ? disabledStyle : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
