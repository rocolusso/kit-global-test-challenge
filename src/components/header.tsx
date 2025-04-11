import React from 'react';

import Navigation from './navigation';
import Logo from './logo';

function Header() {
  return (
    <div className="bg-gray-800 text-white">
      <header className="container mx-auto flex justify-between sm:flex sm:items-center sm:gap-20 h-20">
        <Logo />
        <Navigation />
      </header>
    </div>

  );
}

export default Header;
