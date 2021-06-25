import React, { createContext, useState } from "react"

export const MenuContext = createContext()

export const MenuGeneralProvider = ({ children }) => {
  const [ recargar, setRecargar] = useState(false);
  const [ empresa, setEmpresa ] = useState([]);
  const [ cargarCupones, setCargarCupones ] = useState(false);

  return (
    <MenuContext.Provider value={{empresa, setEmpresa, setRecargar, recargar, cargarCupones, setCargarCupones}}>
      {children}
    </MenuContext.Provider>
  );
};