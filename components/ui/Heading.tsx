type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
};

export function Heading({ level, children, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag className={`text-2xl leading-normal font-bold ${className ?? ''}`}>
      {children}
    </Tag>
  );
}
