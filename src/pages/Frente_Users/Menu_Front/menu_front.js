import { Box, Grid, Hidden, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom'

import BotonCarrito from '../Carrito/botonCarrito'
import Banner from '../Banner/banner';
import Categorias from '../Categorias/categorias';
import clienteAxios from '../../../config/axios';
import Cards_Platos from '../Cards_Platillos/card_plato';

export default function Menu_Front(props) {

	const idMenu = props.match.params.idMenu;
	const [empresas, setEmpresas] = useState([]);

	const consultarDatos = async () => {
		await clienteAxios
			.get(`/company/${idMenu}`)
			.then((res) => {
				setEmpresas([res.data]);
			})
			.catch((err) => {

			})
	}

    useEffect(() => {
		consultarDatos();
	}, [])

    const render = empresas.map(empresa => {
        return(
			<div>  
				<Box>
					<Banner empresa={empresa} />
				</Box>

				<Grid lg={12}>
					<Box mt={5} textAlign="center">
						<Typography variant="h4">
							{empresa.nameCompany}
						</Typography>
					</Box>
				</Grid>

				<Box mt={4}> 	
					<Categorias empresa={empresa}/>
				</Box>

				<Hidden smDown>
					<Box mt={5}> 	
						<Cards_Platos empresa={empresa} />
					</Box>
				</Hidden>
				<BotonCarrito />
			</div>
        );
    })

	return (
		
        <div>
            {render}
        </div>
		
	);
}