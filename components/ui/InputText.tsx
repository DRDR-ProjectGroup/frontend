type InputTextProps = {
  type?: 'text';
  placeholder?: string;
  className?: string;
};

export default function InputText({
  type = 'text',
  placeholder,
  className,
}: InputTextProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border-primitive-grayPrimary h-[46px] w-full rounded-md border px-4 text-sm ${className ?? ''}`}
    />
  );
}
