import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

type PopoverProps = {
  ref?: React.RefObject<HTMLDivElement | null>;
  children?: ReactNode;
  className?: string;
};

export default function Popover({ ref, children, className }: PopoverProps) {
  return (
    <div
      ref={ref}
      className={twMerge(
        'bg-primitive-white w-[150px] rounded py-1 shadow-popover',
        className,
      )}
    >
      {children}
    </div>
  );
}
