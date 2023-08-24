import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

export interface SidebarItemProps {
  icon: IconType;
  label: string;
  href: string;
  pathname: string;
  separate?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
  pathname,
  separate
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
      flex
      items-center
      justify-center
      text-neutral-500
      h-[50px]
    `,
        pathname === href && 'text-white',
        separate && 'mt-auto'
      )}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Icon size={25} />
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};

export default SidebarItem;
