import Link from 'next/link';

export default function NavMenu({ currentPath }: { currentPath: string }) {
  const navMenu = [
    {
      name: '내 정보',
      href: '/mypage/info',
    },
    {
      name: '내 작성글',
      href: '/mypage/posts',
    },
    {
      name: '내 댓글',
      href: '/mypage/comments',
    },
    {
      name: '쪽지함',
      href: '/mypage/message',
    },
  ];

  return (
    <ul className="flex items-center gap-6 text-sm text-text-third border-b border-primitive-graySecond">
      {navMenu.map((navMenu) => {
        const isActive =
          currentPath === navMenu.href ||
          currentPath.startsWith(navMenu.href + '/');
        return (
          <li key={navMenu.name}>
            <Link
              href={navMenu.href}
              className={`block py-3 font-bold hover:text-primitive-green hover:shadow-[inset_0_-2px_0_0_rgb(var(--color-green))] 
              ${isActive ? 'text-primitive-green shadow-[inset_0_-2px_0_0_rgb(var(--color-green))]' : ''}`}
            >
              {navMenu.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
