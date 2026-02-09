import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import Footer from '@/components/layout/Footer';
import TopButton from '@/components/common/TopButton';
import Providers from '@/app/providers';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Providers>
        <div className="wrap">
          {/* 헤더 */}
          <Header />

          {/* 메인 */}
          <Main>{children}</Main>

          {/* 푸터 */}
          <Footer />
        </div>
      </Providers>

      <TopButton />
    </div>
  );
}
