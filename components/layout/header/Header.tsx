import { dummy_navMenu } from "@/dummy/navMenu";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";
import { NavMenuData } from "@/types/api/navMenu";

export default async function Header() {
  // 더미 테스트
  let navMenus = dummy_navMenu;
  
  // let navMenus: NavMenuData[] = [];
  // try {
  //   const response = await fetch(
  //     `${process.env.BACKEND_API_BASE_URL}/categories`,
  //     { cache: 'force-cache' }
  //   );
  //   if (!response.ok) throw new Error('navMenuAPI Error');
  //   const data = await response.json();
  //   navMenus = data.data as NavMenuData[];
  // } 
  // catch (error) {
  //   console.error('Failed to fetch nav menus:', error);
  // }

  return (
    <header className="shadow-xs h-[65px]">
      <div className="max-w-layout mx-auto h-full flex items-center px-6">
        <Logo />
        <div className="ml-8">
          <NavMenu navMenus={navMenus} />
        </div>
        <div className="ml-auto">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}