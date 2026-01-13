import Link from 'next/link';

export default function Header() {
  return (
    <header className="shadow-xs">
      <div className="max-w-layout mx-auto border-b">
        {/* 로고 */}
        <div>
          <Link href="/">DoranDoran</Link>
        </div>
        {/* 네비게이션 메뉴 */}
        <nav>
          <ul>
            <li>
              테크
              <ul>
                <li>프로그래밍</li>
                <li>하드웨어</li>
                <li>소프트웨어</li>
                <li>모바일</li>
              </ul>
            </li>
            <li>
              게임
              <ul>
                <li>PC 게임</li>
                <li>콘솔 게임</li>
                <li>모바일 게임</li>
                <li>Esports</li>
              </ul>
            </li>
            <li>
              일상
              <ul>
                <li>여행</li>
                <li>음식</li>
                <li>건강</li>
                <li>취미</li>
              </ul>
            </li>
            <li>
              문화
              <ul>
                <li>영화</li>
                <li>음악</li>
                <li>책</li>
                <li>예술</li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* 유저 메뉴 */}
      </div>
    </header>
  );
}
