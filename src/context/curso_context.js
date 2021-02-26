import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
	const [ datos, setDatos ] = useState([]);
	const [ update, setUpdate ] = useState(true);
	const [ preview, setPreview ] = useState(null);

	return (
		<ImageContext.Provider value={{ datos, setDatos, update, setUpdate, preview, setPreview }}>
			{children}
		</ImageContext.Provider>
	);
};
