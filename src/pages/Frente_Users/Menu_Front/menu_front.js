import { Box, Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import No_Page from '../../../components/noPage'

import BotonCarrito from '../Carrito/botonCarrito'
import Banner from '../Banner/banner';
import Categorias from '../Categorias/categorias';
import clienteAxios from '../../../config/axios';
import Consulta_platillos from '../Cards_Platillos/consulta_plato';
import Spin from '../../../components/Spin/spin';
import { ImageContext } from '../../../context/curso_context';


const useStyles = makeStyles((theme) => ({
    imagen: {
		maxHeight: '100%',
		maxWidth: '100%'
	},
	containerImage:{
		width: 300,
		height: 190
	}
}));

export default function Menu_Front(props) {
	const classes = useStyles();

	const idMenu = props.match.params.idMenu;
	const [empresas, setEmpresas] = useState([]);
	const [ loading, setLoading ] = useState(false);
    const {  setNombre, setId, setSlug  } = useContext(ImageContext);

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
						{setNombre(empresa.nameCompany)}
						{setId(empresa._id)}
						{setSlug(empresa.slug)}
						{localStorage.setItem("idEmpresa", empresa._id)}
						{localStorage.setItem("slug", empresa.slug)}
					<Box>
						<Banner empresa={empresa} />
					</Box>

					<Grid container justify="center" lg={12}>
						<Box mt={3} textAlign="center" className={classes.containerImage}>
							<img className={classes.imagen} alt="Imagen Logo" src={empresa.logoImagenUrl}/>
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