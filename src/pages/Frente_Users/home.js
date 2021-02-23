import { Box } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import Banner from './Banner/banner';
import Consulta_platillos from './Cards_Platillos/consulta_plato';

export default function Home() {
	return (
		<div>
			<Box>
				<Banner />
			</Box>
			<Box mt={8}>
				<Consulta_platillos />
			</Box>
		</div>
	);
}
