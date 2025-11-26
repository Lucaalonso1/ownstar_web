'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CursorType = 'default' | 'pointer' | 'text' | 'product' | 'magnetic';

interface CursorContextType {
  cursorType: CursorType;
  cursorText: string;
  setCursorType: (type: CursorType) => void;
  setCursorText: (text: string) => void;
  addCursorBorder: () => void;
  removeCursorBorder: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const addCursorBorder = () => setCursorType('pointer');
  const removeCursorBorder = () => {
    setCursorType('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider
      value={{
        cursorType,
        cursorText,
        setCursorType,
        setCursorText,
        addCursorBorder,
        removeCursorBorder,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

