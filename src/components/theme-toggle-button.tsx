'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/src/components/ui/button';
import { toggleTheme } from '../store/themeReducer';
import { RootState } from '../store';

export default function ThemeToggleButton() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <Button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className={theme === 'dark' ? 'bg-gray-800 p-2  text-white border border-gray-200' : 'bg-gray-200 p-2  border border-gray-800 text-black'}
    >

      Switch to
      {' '}
      {theme === 'light' ? '🌙' : '☀️'}
      Mode
    </Button>
  );
}
