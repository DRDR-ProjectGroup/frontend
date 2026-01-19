import Logo from './Logo';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className="shadow-xs">
      <div className="max-w-layout mx-auto flex items-center px-6">
        {/* 로고 */}
        <Logo />

        {/* 네비게이션 메뉴 */}
        <div className="ml-8">
          <NavMenu />
        </div>

        {/* 유저 메뉴 */}
        <div className="ml-auto">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
