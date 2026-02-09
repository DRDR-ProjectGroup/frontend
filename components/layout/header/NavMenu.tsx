'use client';

import Popover from '@/components/ui/Popover';
import Link from 'next/link';
import { useState } from 'react';
import { useGroupAndCategoryQuery } from '@/query/category/useCategoryQuery';

export default function NavMenu() {
  const [activeNav, setActiveNav] = useState('');
  const {
    data: groupAndCategory,
    isLoading,
    isError,
  } = useGroupAndCategoryQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!groupAndCategory?.data) return <div>카테고리 데이터가 없습니다.</div>;

  const navMenus = groupAndCategory.data || [];

  return (
    <nav>
      <ul className="flex items-center">
        {navMenus.map((navMenu) => (
          <li
            className="relative flex h-[65px] cursor-pointer items-center justify-center px-4 text-sm"
            key={navMenu.groupName}
            onMouseEnter={() => {
              setActiveNav(navMenu.groupName);
            }}
            onMouseLeave={() => {
              setActiveNav('');
            }}
          >
            <span className="text-sm font-bold">{navMenu.groupName}</span>
            {activeNav === navMenu.groupName && (
              <div className="absolute top-12.5 left-2.5 z-10">
                <Popover>
                  <ul>
                    {navMenu.categories.map((category) => (
                      <li key={category.categoryAddress}>
                        <Link
                          href={`/category/${category.categoryAddress}`}
                          className="block hover:bg-primitive-graySecond px-4 py-2"
                        >
                          {category.categoryName}
                        </Link>
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
