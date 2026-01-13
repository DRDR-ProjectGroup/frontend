import { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="max-w-layout mx-auto min-h-[500px] bg-[lightgray]">
        메인 컴포넌트
        {children}
      </div>
    </main>
  );
}
