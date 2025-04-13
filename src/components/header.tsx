'use client';

import React from 'react';

import { useSelector } from 'react-redux';
import Navigation from './navigation';
import Logo from './logo';
import { RootState } from '../store';

function Header() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <div className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}>
      <header className="container mx-auto flex justify-between sm:flex sm:items-center sm:gap-20 h-20">
        <Logo />
        <Navigation />
      </header>
    </div>

  );
}

export default Header;
