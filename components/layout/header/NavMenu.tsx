'use client';

import Popover from '@/components/ui/Popover';
import Link from 'next/link';
import { useState } from 'react';

export default function NavMenu() {
  const [activeNav, setActiveNav] = useState('');

  const navMenus = [
    {
      title: '테크',
      subMenu: [
        { title: '프로그래밍', path: 'prog' },
        { title: '하드웨어', path: 'hardware' },
        { title: '소프트웨어', path: 'software' },
        { title: '모바일', path: 'mobile' },
      ],
    },
    {
      title: '게임',
      subMenu: [
        { title: 'PC 게임', path: 'pc-game' },
        { title: '콘솔 게임', path: 'console-game' },
        { title: '모바일 게임', path: 'mobile-game' },
        { title: 'Esports', path: 'esports' },
      ],
    },
    {
      title: '일상',
      subMenu: [
        { title: '여행', path: 'travel' },
        { title: '음식', path: 'food' },
        { title: '건강', path: 'health' },
        { title: '취미', path: 'hobby' },
      ],
    },
    {
      title: '문화',
      subMenu: [
        { title: '영화', path: 'movie' },
        { title: '음악', path: 'music' },
        { title: '책', path: 'book' },
        { title: '예술', path: 'art' },
      ],
    },
  ];

  return (
    <nav>
      <ul className="flex items-center">
        {navMenus.map((navMenu) => (
          <li
            className="relative flex h-[65px] cursor-pointer items-center justify-center px-4 text-sm"
            key={navMenu.title}
            onMouseEnter={() => {
              setActiveNav(navMenu.title);
            }}
            onMouseLeave={() => {
              setActiveNav('');
            }}
          >
            <span className="text-bold text-sm">{navMenu.title}</span>
            {activeNav === navMenu.title && (
              <div className="absolute top-12.5 left-2.5 z-10">
                <Popover>
                  <ul>
                    {navMenu.subMenu.map((sub) => (
                      <li
                        key={sub.path}
                        className="hover:bg-primitive-graySecond px-4 py-2"
                      >
                        <Link href={sub.path}>{sub.title}</Link>
                      </li>
                    ))}
                  </ul>
                </Popover>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
