
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center mx-auto min-h-[500px] max-w-[352px]">
      {children}
    </div>
  )
}