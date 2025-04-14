import React from 'react';
import '@/src/app/global.css';
import Providers from '@/src/app/providers';
import Header from '@/src/components/header';

export const metadata = {
  title: 'Blog App',
  description: 'App with Redux Theme Switcher',
};
function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div
        className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
      >
        {children}
      </div>
    </Providers>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>
          <Header />
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
