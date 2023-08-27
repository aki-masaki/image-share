'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { FaBookmark, FaDice, FaHome, FaPlus, FaUser } from 'react-icons/fa';
import SidebarItem, { SidebarItemProps } from './sidebar-item';

const Sidebar = () => {
  const pathname = usePathname();

  const items = useMemo(
    (): SidebarItemProps[] => [
      {
        icon: FaHome,
        label: 'Home',
        href: '/',
        pathname
      },
      {
        icon: FaDice,
        label: 'Random',
        href: '/random',
        pathname
      },
      {
        icon: FaBookmark,
        label: 'Collections',
        href: '/collections',
        pathname
      },
      {
        icon: FaPlus,
        label: 'Upload',
        href: '/upload',
        pathname,
        separate: true
      },
      {
        icon: FaUser,
        label: 'Account',
        href: '/account',
        pathname
      }
    ],
    [pathname]
  );

  return (
    <div className='h-full w-[50px] rounded-lg border border-gray-700 flex flex-col'>
      {items.map(item => (
        <SidebarItem key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Sidebar;
