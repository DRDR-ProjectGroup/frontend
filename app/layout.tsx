import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const roboto = Roboto({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['700', '500', '400'],
});

export const metadata: Metadata = {
  title: '도란도란(DoranDoran)',
  description: '같이 이야기하고 같이 공감하는 공간, 도란도란',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${roboto.variable} bg-bg-primary text-text-primary font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
