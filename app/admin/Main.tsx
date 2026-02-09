import { Heading } from '@/components/ui/Heading';
import { NavMenu } from './layout';

interface MainProps {
  children: React.ReactNode;
  navMenus: NavMenu[];
  currentPath: string;
}
export default function Main({ navMenus, currentPath, children }: MainProps) {
  const title = navMenus.find((menu) => menu.href === currentPath)?.name ?? '';

  return (
    <div className="flex-1 flex flex-col bg-cyan-50">
      <div className="flex items-center px-8 h-16 bg-bg-primary border-b border-primitive-grayPrimary">
        <Heading level={1} className="text-lg">
          {title}
        </Heading>
      </div>
      <div className="p-8 w-full flex-1 overflow-y-auto">
        <div className="max-w-layout mx-auto">{children}</div>
      </div>
    </div>
  );
}
