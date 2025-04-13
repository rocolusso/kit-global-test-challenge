import React from 'react';

import ThemeToggleButton from '@/src/components/theme-toggle-button';
import NavButton from './nav-button';

type ButtonVariant = 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined;

const links:{
  className: string;
  targetUrl: string;
  variant: ButtonVariant;
  btnText: string;
}[] = [{
  className: 'hover:scale-105 bg-gray-200 text-black hover:bg-green-400 hover:text-white focus:outline-none focus:shadow-outline',
  targetUrl: '/',
  variant: null,
  btnText: 'Create post',
},
{
  className: 'hover:scale-105 bg-gray-200 text-black  focus:outline-none focus:shadow-outline',
  targetUrl: '/posts',
  variant: 'outline',
  btnText: 'Posts',
},
];

function Navigation() {
  return (
    <div className="header-navigation flex justify-center items-center">
      <nav>
        <ul
          className="flex flex-wrap gap-2 "
        >
          {links.map((link) => (
            <li key={Math.random()}>
              <NavButton
                key={link.targetUrl}
                className={link.className}
                targetUrl={link.targetUrl}
                variant={link.variant}
                btnText={link.btnText}
              />
            </li>
          ))}
          <li>
            <ThemeToggleButton />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
