import { twMerge } from 'tailwind-merge';

type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function InputText({ className, ...props }: InputTextProps) {
  return (
    <input
      {...props}
      className={twMerge(
        'border-primitive-grayPrimary h-[46px] w-full rounded-md border px-4 text-sm',
        className,
      )}
    />
  );
}
