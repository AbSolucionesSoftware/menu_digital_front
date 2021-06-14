import { Avatar, Box, Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import No_Page from '../../../components/noPage'
import LoginAdmin from '../Login/login'
import HomePublicidad from '../../Publicidad/Home/home'

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
		width: 150,
		height: 90
	},
	large: {
		width: theme.spacing(15),
		height: theme.spacing(15),
	  },
}));

export default function Menu_Front(props) {
	const classes = useStyles();

	const slug = props.match.params.slug;

	const [empresa, setEmpresa] = useState([]);
	const [ loading, setLoading ] = useState(true);

    const {  setNombre, setId, setSlug  } = useContext(ImageContext);

	const consultarDatos = async () => {
		await clienteAxios
			.get(`/company/slug/company/${slug}`)
			.then((res) => {
				setLoading(false);
				if (res.data === null) {
					return 
				}else{
					setLoading(false);
					setEmpresa(res.data);
				}
			})
			.catch((err) => {
				setLoading(false);
			})
	}
	

	useEffect(() => {
		consultarDatos();
	}, [loading])


	if (loading) {
		return (
			<>
				<Spin loading={loading} />
			</>
		);
	}

	if (empresa === null) {
		<No_Page/>
	}else{
		if (empresa.public === true) {
			return(
				<div> 
					
					<Spin loading={loading} />
						{setNombre(empresa.nameCompany)}
						{setId(empresa._id)}
						{setSlug(empresa.slug)}
						{localStorage.setItem("idEmpresa", empresa._id)}
						{localStorage.setItem("slug", empresa.slug)}
					<Box>
						<Banner empresa={empresa} />
					</Box>

					<Grid container justify="center" item lg={12}>
						<Box mt={3} textAlign="center">
							<Avatar className={classes.large} alt="Remy Sharp"  src={empresa.logoImagenUrl} />
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
	}

	
	
}