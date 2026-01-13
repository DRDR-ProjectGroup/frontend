import { ReactNode } from 'react';

export default function Popover({ children }: { children?: ReactNode }) {
  return (
    <div className="w-[150px] py-1 rounded shadow-[0_0_10px_rgba(0,0,0,0.15)] bg-primitive-white">
      {children}
    </div>
  );
}
