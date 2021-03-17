import { Box, Grid, Hidden, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom'
import No_Page from '../../../components/noPage'

import BotonCarrito from '../Carrito/botonCarrito'
import Banner from '../Banner/banner';
import Categorias from '../Categorias/categorias';
import clienteAxios from '../../../config/axios';
import Consulta_platillos from '../Cards_Platillos/consulta_plato';
import Spin from '../../../components/Spin/spin';

export default function Menu_Front(props) {

	const idMenu = props.match.params.idMenu;
	const [empresas, setEmpresas] = useState([]);
	const [ loading, setLoading ] = useState(false);

	const consultarDatos = async () => {
		setLoading(true);
		await clienteAxios
			.get(`/company/${idMenu}`)
			.then((res) => {
				setLoading(false);
				setEmpresas([res.data]);
			})
			.catch((err) => {
				setLoading(false);
			})
	}

    useEffect(() => {
		consultarDatos();
	}, [])

    const render = empresas.map((empresa ,index) => {
		if (empresa.public === true) {
			return(
				<div key={index}> 
					<Spin loading={loading} />
					<Grid lg={12}>
						<Box mt={1} textAlign="center">
							<Typography variant="h4">
								{empresa.nameCompany}
							</Typography>
						</Box>
					</Grid>
					
					<Box>
						<Banner empresa={empresa} />
					</Box>

					<Grid lg={12}>
						<Box mt={2} textAlign="center">
							<Typography variant="h5">
								Consulta nuestro Menu y Carta
							</Typography>
						</Box>
					</Grid>

					<Box mt={1}> 	
						<Categorias empresa={empresa._id} slug={empresa.slug} />
					</Box>

					<Hidden smDown>
						<Box mt={5}> 	
							<Consulta_platillos empresa={empresa} />
						</Box>
					</Hidden>
					
					<BotonCarrito empresa={empresa}/>
				</div>
			);
		}else{
			return(
				<No_Page/>
			);
		}
    })

	return (
        <div>
            {render}
        </div>
	);
}