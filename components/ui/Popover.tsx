import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

type PopoverProps = {
  children?: ReactNode;
  className?: string;
};

export default function Popover({ children, className }: PopoverProps) {
  return (
    <div
      className={twMerge(
        'bg-primitive-white w-[150px] rounded py-1 shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
}
