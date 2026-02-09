import Link from 'next/link';

export default function NavMenu({ type }: { type: string }) {
  const navMenu = [
    {
      name: '받은 쪽지함',
      type: 'inbox',
    },
    {
      name: '보낸 쪽지함',
      type: 'sent',
    },
  ];

  return (
    <ul className="flex items-center gap-6 text-sm text-text-third border-b border-primitive-graySecond">
      {navMenu.map((navMenu) => {
        const isActive = type === navMenu.type;
        return (
          <li key={navMenu.name}>
            <Link
              href={`/mypage/message?type=${navMenu.type}&page=1`}
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
