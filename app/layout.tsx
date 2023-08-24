import './globals.css';
import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';

const comfortaa = Comfortaa({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Image Share',
  description: 'Share your favorite images online!'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={comfortaa.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
