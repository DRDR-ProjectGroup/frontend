import { twMerge } from 'tailwind-merge';

type TagProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'notice';
};

export default function Tag({
  children,
  className,
  variant = 'default',
}: TagProps) {
  const variants: Record<NonNullable<TagProps['variant']>, string> = {
    default: 'bg-primitive-grayThird',
    notice: 'bg-primitive-red text-primitive-white',
  };
  return (
    <span
      className={twMerge(
        'inline-block font-bold text-xs text-text-second px-2 py-1 rounded-sm',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
