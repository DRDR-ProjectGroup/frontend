import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import Footer from '@/components/layout/Footer';
import TopButton from '@/components/common/TopButton';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="wrap">
        {/* 헤더 */}
        <Header />

        {/* 메인 */}
        <Main>{children}</Main>

        {/* 푸터 */}
        <Footer />
      </div>

      <TopButton />
    </div>
  );
}
