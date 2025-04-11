import React from 'react';
import Link from 'next/link';

function Logo() {
  return (
    <div className="flex items-center p-5">
      <Link href="/">
        <div>
          <h2 className="uppercase  text-3xl  font-bold ">
            Blog App
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default Logo;
