import { NavMenuData } from '@/types/api/navMenu';
import HeaderClient from './HeaderClient';

export default async function Header() {
  let navMenus: NavMenuData[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/categories`,
      { cache: 'force-cache' },
    );
    if (response.ok) {
      const data = await response.json();
      navMenus = data.data as NavMenuData[];
    }
  } catch (error) {
    console.error('Failed to fetch nav menus:', error);
  }

  return (
    <div className="h-[65px]">
      <HeaderClient navMenus={navMenus} />
    </div>
  );
}
