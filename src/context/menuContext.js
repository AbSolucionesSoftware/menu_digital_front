import React, { createContext, useState } from "react"

export const MenuContext = createContext()

export const MenuGeneralProvider = ({ children }) => {
  const [ recargar, setRecargar] = useState(false);
  const [ empresa, setEmpresa ] = useState([]);

  return (
    <MenuContext.Provider value={{empresa, setEmpresa, setRecargar, recargar}}>
      {children}
    </MenuContext.Provider>
  );
};