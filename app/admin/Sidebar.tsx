import Logo from '@/components/common/Logo';
import Button from '@/components/ui/Button';
import { RiMenuFold2Line, RiMenuFoldLine } from 'react-icons/ri';
import { NavMenu } from '@/app/admin/layout';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

interface SidebarProps {
  navMenus: NavMenu[];
  currentPath: string;
  className?: string;
}

export default function Sidebar({
  navMenus,
  currentPath,
  className,
}: SidebarProps) {
  const [folded, setFolded] = useState(false);

  return (
    <div
      className={twMerge(
        'h-full bg-primary border-r border-primitive-grayPrimary',
        folded ? 'w-17' : 'w-54',
        className,
      )}
    >
      <div
        className={twMerge(
          'flex gap-2 items-center h-16 border-b border-primitive-grayPrimary',
          folded ? 'justify-center px-0' : 'px-4',
        )}
      >
        <Button variant="icon" onClick={() => setFolded(!folded)}>
          {folded ? (
            <RiMenuFold2Line className="w-4 h-4" />
          ) : (
            <RiMenuFoldLine className="w-4 h-4" />
          )}
          <span className="sr-only">
            {folded ? '메뉴 펼치기' : '메뉴 접기'}
          </span>
        </Button>
        {!folded && <Logo />}
      </div>
      <div className="py-6">
        <ul>
          {navMenus.map((navMenu) => (
            <li
              key={navMenu.name}
              className={twMerge(
                'text-text-second hover:bg-primitive-green/70 transition-colors duration-300 ',
                currentPath === navMenu.href &&
                  'bg-primitive-green/40 shadow-[inset_-2px_0_0_0_rgba(var(--color-green))]',
              )}
            >
              <Link
                href={navMenu.href}
                className="px-6 h-11 flex items-center gap-2 text-sm "
              >
                {navMenu.icon}
                {!folded && <span>{navMenu.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
