import React, { createContext } from 'react';

export const Context = createContext(null);

function ContextProvider({ children, contextValue }) {
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default ContextProvider;
