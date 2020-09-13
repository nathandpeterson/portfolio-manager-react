import React, { createContext, useContext, useState } from 'react';

const WindowSizeContext= createContext();
const WindowSizeDispatch = createContext();

const emptyState = {
  navbarHeight: 0,
  totalHeight: 0,
  mainHeight: 0, // total - navbar = mainHeight
  totalWidth: 0,
}


export const WindowSizeProvider = ({ children }) => {
  const [windowSize, updateWindowSize] = useState(emptyState);
  return (
    <WindowSizeContext.Provider value={windowSize}>
    <WindowSizeDispatch.Provider value={updateWindowSize}>
      {children}
    </WindowSizeDispatch.Provider>
  </WindowSizeContext.Provider>
  )
}

export function useWindowSize(){
  const context = useContext(WindowSizeContext);
  if (context === undefined) {
    throw new Error('useWindowSize must be used within a WindowSizeProvider')
  }
  return context;
}

export function useUpdateWindowSize(){
  const context = useContext(WindowSizeDispatch);
  if (context === undefined) {
    throw new Error('useUpdateWindowSize must be used within a WindowSizeProvider')
  }
  return context;
}