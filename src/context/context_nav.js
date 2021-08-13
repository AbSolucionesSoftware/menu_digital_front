import React, { createContext, useState } from 'react'

export const NavContext = createContext();

export const NavProvider = ({children}) => {
    const [ update, setUpdate ] = useState(true);
    const [ dtxEmpresas, setDtxEmpresas ] = useState([]);
    const [ reload, setReload ] = useState(true);

    return (
        <NavContext.Provider 
            value={{ update, setUpdate, dtxEmpresas, setDtxEmpresas, reload, setReload}}
        >
            {children}
        </NavContext.Provider>
    )
}