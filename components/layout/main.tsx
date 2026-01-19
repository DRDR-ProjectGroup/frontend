import { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[300px]">
      <div className="max-w-layout mx-auto px-6 pt-8 pb-12">{children}</div>
    </main>
  );
}
