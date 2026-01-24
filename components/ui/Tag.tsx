export default function Tag({children}: {children: React.ReactNode}) {
  return <span className="inline-block font-bold text-xs text-text-second px-2 py-1 bg-primitive-grayThird rounded-sm">{children}</span>;
}