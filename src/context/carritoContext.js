import React, { createContext, useState } from "react"

export const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [active, setActive] = useState(true);
  const [recargar, setRecargar] = useState(false);
  const [reloadFilter, setReloadFilter] = useState(true);

  return (
    <MenuContext.Provider value={{active, setActive, setRecargar, recargar, reloadFilter, setReloadFilter}}>
      {children}
    </MenuContext.Provider>
  );
};