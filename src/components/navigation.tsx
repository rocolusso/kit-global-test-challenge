import React from 'react';

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
        <ul className=" pr-5 sm:p-0 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-10">
          {links.map((link) => (
            <li key={Math.random()}>
              <NavButton
                key={Math.random()}
                className={link.className}
                targetUrl={link.targetUrl}
                variant={link.variant}
                btnText={link.btnText}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
