'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface NavButtonProps {
    className :string,
    targetUrl:string,
    variant:'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined,
    btnText:string,
}
function NavButton({
  className, targetUrl, variant, btnText,
}: NavButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      size="sm"
      variant={variant}
      className={className}
      onClick={() => {
        router.push(targetUrl);
      }}
    >
      {btnText}
    </Button>
  );
}

export default NavButton;
