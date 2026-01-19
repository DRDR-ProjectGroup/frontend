import { ReactNode } from 'react';

export default function Popover({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-primitive-white w-[150px] rounded py-1 shadow-md">
      {children}
    </div>
  );
}
