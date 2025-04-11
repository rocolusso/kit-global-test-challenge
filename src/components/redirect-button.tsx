'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface ButtonProps {
    className:string,
    targetUrl:string,
    variant:'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined,
    btnText:string,
}
function RedirectButton({
  className, targetUrl, variant, btnText,
}: ButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      size="default"
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

export default RedirectButton;
