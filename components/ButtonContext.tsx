"use client"
import React, { createContext, useRef, useContext, ReactNode, MutableRefObject } from 'react';

interface ButtonContextType {
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
  clickButton: () => void;
}

const ButtonContext = createContext<ButtonContextType | undefined>(undefined);

export const ButtonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const clickButton = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  return (
    <ButtonContext.Provider value={{ buttonRef, clickButton }}>
      {children}
    </ButtonContext.Provider>
  );
};

export const useButton = (): ButtonContextType => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('useButton must be used within a ButtonProvider');
  }
  return context;
};
