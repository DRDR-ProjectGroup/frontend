import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function Select({ children, className, ...props }: SelectProps) {
  return (
    <select
        {...props}
        className={`border-primitive-grayPrimary h-[36px] w-[131px] rounded-md border px-3 text-sm ${className ?? ''}`}
      >
        {children}
      </select>
  );
}