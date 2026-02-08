import { TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={twMerge(
        'w-full h-32 p-2 border border-primitive-grayPrimary rounded-md',
        className,
      )}
    />
  );
}
