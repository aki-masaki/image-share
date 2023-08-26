import Sidebar from '@/components/sidebar';
import ThemeProvider from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import './globals.css';

const comfortaa = Comfortaa({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Image Share',
  description: 'Share your favorite images online!'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className='h-full w-full'>
      <body
        className={twMerge(
          `
        p-4
        flex
        w-full
        h-full
        overflow-hidden
      `,
          comfortaa.className
        )}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Sidebar />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
