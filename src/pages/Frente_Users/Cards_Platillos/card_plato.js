import React, {useEffect, useState} from 'react';
import AgregarCarrito from './agregarCarrito';
import {formatoMexico, verificarDiasLaborales} from '../../../config/reuserFunction'

import { Box, Button, Dialog,  Divider,  Drawer,  Grid, Hidden, IconButton, Tooltip, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import './styles.scss';
import Sesion from '../../../components/Verificacion_sesion/verificacion_sesion';
import { useContext } from 'react';
import { MenuContext } from '../../../context/menuContext';

export default function Cards_Platos(props) {
	const {productos} = props;
	const { empresa } = useContext(MenuContext);
	
	const [diaLaboral, setDiaLaboral] = useState();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const sesion = Sesion(props, false);

	const [agregarProducto, setagregarProducto] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

	useEffect(() => {

		setDiaLaboral(verificarDiasLaborales(empresa));
		
	}, [empresa]);

	

	// const [ extras, setExtras] = useState([]);
	// var variables
	// function extrasProductos(producto) {
	// 	if (producto.extrasActive) {
	// 		setExtras(producto.extras.split(","));
	// 		for (let extra = 0; extra < extras.length; extra++) {
	// 			variables = extras[extra];
	// 		}
	// 	}else{
	// 		return null;
	// 	}
	// }

	const render = productos.map((producto, index) => {
		return (
			<>
			{
				producto.public === false ? (
					null
				) : (
					<>
					<Hidden smDown>
						<Grid  item lg={6} className={classes.paper}>
							<Card className={classes.root} >
								<Box display="flex" flexWrap="wrap">
									<Grid item lg={5}>
										<Hidden smDown>
											<CardMedia
												id={producto._id}
												className={classes.cover}
												image={producto.imagenProductUrl}
												title="Imagen de producto"
											/>
										</Hidden>
									</Grid>
									<Grid item lg={7}>
										<Box p={1}>
											<Tooltip title={producto.name} placement="top">
												<Grid  item  xs zeroMinWidth >
													<Box display="flex" justifyContent="center">
														<Typography className={classes.rootTitulo} variant="h4" noWrap>
															{producto.name}
														</Typography>
													</Box>
												</Grid>
											</Tooltip>
											<Grid item xs>
												<Box display="flex" justifyContent="center">
													<Typography className={classes.rootTitulo} variant="h2" >
														{producto.description} 
													</Typography>
												</Box>
											</Grid>
											<Grid item xs zeroMinWidth>
												<Box mt={2}>
													<Typography variant="h3" color="textSecondary">
														${formatoMexico(producto.price)} 
													</Typography>
												</Box>
											</Grid>
											{sesion ? (
												null
											) : (
												diaLaboral ? (
													<Grid  item  lg={12}>
														<Box p={1}>
															<Button
																variant="contained" 
																color="primary"
																disabled={true}
															>
																Día no Laboral
																{/* <AddShoppingCartIcon color="secondary" className={classes.largeCar} /> */}
															</Button>
														</Box>
													</Grid>
												):(
													<Grid  item  lg={12}>
														<Box p={1}>
															<Button
																variant="contained" 
																color="primary" 
																onClick={() => {
																handleClickOpen()
																setagregarProducto(producto)
																// extrasProductos(producto)
																}}
															>
																Agregar a orden
																{/* <AddShoppingCartIcon color="secondary" className={classes.largeCar} /> */}
															</Button>
														</Box>
													</Grid>
												) 
												
											)}
										</Box>
									</Grid>	
								</Box>
							</Card>
						</Grid>
					</Hidden>
					<Hidden mdUp>
						<Grid item xs={12} className={classes.paper}>
						{/* <Card> */}
							<Grid 
								container 
								onClick={
								() => {
									handleClickOpen()
									setagregarProducto(producto)
								}} 
							>
								<Grid item  xs={8}>
									<Box display="flex" textAlign="justify"  variant="h2">
										<Typography style={{fontWeight: 600}}>
											{producto.name} 
										</Typography>
									</Box>
									<Box mt={1} display="flex" textAlign="justify" >
										<Typography variant="h2">
											{producto.description} 
										</Typography>
									</Box>
								</Grid>		
								<Grid  item  xs={2}>
									<Grid >
										<Box display="flex" alignItems="center" justifyContent="center" flexDirection="row">
											<Typography variant="h5" style={{fontWeight: 600}}>
												${formatoMexico(producto.price)} 
											</Typography>
										</Box>
									</Grid>
								</Grid>
								<Grid item xs={2}>
									<Grid item xs zeroMinWidth>
										<Box display="flex" alignItems="center" justifyContent="center">
											<IconButton 
												variant="contained" 
												color="primary" 
												onClick={() => {
													handleClickOpen()
													setagregarProducto(producto)
												}} 
											>
												<AddCircleIcon style={{fontSize: 40}}/>
											</IconButton>
										</Box>
									</Grid>
								</Grid>
							</Grid>
							<Grid  item  lg={12} xs={12}>
								<Divider variant="inset:" />
							</Grid>
						{/* </Card> */}
						</Grid>
					</Hidden>
				</>
				)
			}
		</>
		);
	})

	return (
		<div>
			<Grid container justify="center" alignItems="center">
                {render}
            </Grid>

			<Hidden mdUp>
				<Drawer
					anchor="bottom"
					open={open} 
					onClose={handleClose}
					classes={{
						paper: classes.drawerPaper
					}}
				> 
					<AgregarCarrito 
						imagen={agregarProducto.imagenProductUrl} 
						nombre={agregarProducto.name} 
						precio={agregarProducto.price}
						producto={agregarProducto}
						setOpen={setOpen}  
					/>
				</Drawer>
			</Hidden>
			<Hidden smDown>
                <Dialog open={open} onClose={handleClose}>
					<AgregarCarrito 
						imagen={agregarProducto.imagenProductUrl} 
						nombre={agregarProducto.name} 
						precio={agregarProducto.price}
						producto={agregarProducto}
						setOpen={setOpen}  
					/>
                </Dialog>
            </Hidden>
			
		</div>
	
	);
}