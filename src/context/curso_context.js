import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
	const [ datos, setDatos ] =  useState([]);
	const [ nombre , setNombre ] = useState([]);
	const [ id , setId ] = useState([]);
	const [ slug , setSlug ] = useState([]);
	const [ update, setUpdate ] = useState(true);
	const [ preview, setPreview ] = useState(null);
	
	return (
		<ImageContext.Provider value={{slug , setSlug, id , setId, nombre, setNombre, datos, setDatos, update, setUpdate, preview, setPreview }}>
			{children}
		</ImageContext.Provider>
	);
};
