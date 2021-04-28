import React, { useEffect, useState } from 'react';

import { Box, Button, Grid, Typography, Drawer, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import RegistroProducto from './services/registroProducto';
import CardPlato from './cardPlato';
import clienteAxios from '../../../config/axios';
import Spin from '../../../components/Spin/spin';
import useStyles from './styles';

export default function Menu(props) {
	const user = JSON.parse(localStorage.getItem('user'));

	const [ productos, setProductos ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ upload, setUpload ] = useState(false);
	const [ busqueda, setBusqueda ] = useState('');
	const [ editarProducto, setEditarProducto ] = useState();

	const traerProdutos = async () => {
		setLoading(true);
		await clienteAxios
			.get(`/product/${user._id}`)
			.then((res) => {
				/* setUpload(true); */
				setLoading(false);
				setProductos(res.data);
			})
			.catch((err) => {
				/* setUpload(true); */
				setLoading(false);
			});
	};

	const obtenerBusqueda = (e) => setBusqueda(e.target.value);

	const buscarBD = () => {
		if (!busqueda) {
			return;
		}
		props.history.push(`/user/${user._id}/${busqueda}`);
	};

	const pressEnter = (e) => {
		if (!e.target.defaultValue) return;
		if (e.key === 'Enter') props.history.push(`/user/${user._id}/${e.target.defaultValue}`);
	};

	useEffect(
		() => {
			traerProdutos();
		},
		[ upload ]
	);

	const [ open, setOpen ] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setUpload(!upload);
		setOpen(false);
	};

	const classes = useStyles();

	return (
		<div>
			<Spin loading={loading} />
			<Grid>
				<Grid lg={12}>
					<Box textAlign="center">
						<Typography variant="h4">Tus Platillos</Typography>
					</Box>
				</Grid>
				<Grid container>
					<Grid lg={5}>
						<Box p={1}>
							<Box className={classes.search}>
								<InputBase
									placeholder="¿Buscas algun platillo?"
									className={classes.inputSearch}
									value={busqueda}
									onChange={obtenerBusqueda}
									onKeyPress={pressEnter}
								/>
								<Box className={classes.grow} />
								<IconButton size="large" color="inherit" onClick={() => buscarBD()}>
									<SearchIcon />
								</IconButton>
							</Box>
						</Box>
					</Grid>
					<Grid lg={7}>
						<Box p={2} display="flex" justifyContent="center">
							<Button variant="contained" color="primary" size="large" onClick={handleDrawerOpen}>
								Agregar Nuevo
							</Button>
						</Box>
					</Grid>
				</Grid>
				<Grid container>
					<Grid lg={12}>
						<CardPlato setUpload={setUpload} upload={upload} productos={productos} />
					</Grid>
				</Grid>
			</Grid>

			<Drawer anchor="right" open={open} onClose={handleDrawerClose}>
				<RegistroProducto
					handleDrawerClose={handleDrawerClose}
					editarProducto={editarProducto}
				/>
			</Drawer>
		</div>
	);
}
