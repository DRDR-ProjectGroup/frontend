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
  icons: {
    icon: [
      { url: '/favicon.ico' }, // 브라우저 기본 파비콘
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }, // 고해상도 파비콘
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }, // 아이폰용 홈 화면 아이콘
    ],
  },
  manifest: '/site.webmanifest', // 웹 매니페스트 (안드로이드/PWA용)
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
