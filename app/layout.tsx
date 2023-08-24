import ThemeProvider from '@/components/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import Sidebar from '@/components/sidebar';
import { twMerge } from 'tailwind-merge';

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
