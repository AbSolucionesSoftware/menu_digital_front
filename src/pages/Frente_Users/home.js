import { Box, Hidden } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom'

import BotonCarrito from './Carrito/botonCarrito'
import Banner from './Banner/banner';
import Consulta_platillos from './Cards_Platillos/consulta_plato';
import Categorias from './Categorias/categorias';
import clienteAxios from '../../config/axios';

export default function Home(props) {

	return (
		
		<div>
			Home
		</div>	
	);
}
