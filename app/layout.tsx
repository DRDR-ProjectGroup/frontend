import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/header';
import Main from '../components/layout/main';
import Footer from '../components/layout/footer';

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
        className={`${roboto.variable} font-sans antialiased bg-bg-primary text-text-primary`}
      >
        <div className="wrap">
          {/* 헤더 */}
          <Header />

          {/* 메인 */}
          <Main>{children}</Main>

          {/* 푸터 */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
