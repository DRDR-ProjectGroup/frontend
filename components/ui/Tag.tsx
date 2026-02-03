import { twMerge } from 'tailwind-merge';

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={twMerge(
        'inline-block font-bold text-xs text-text-second px-2 py-1 bg-primitive-grayThird rounded-sm',
        className,
      )}
    >
      {children}
    </span>
  );
}
