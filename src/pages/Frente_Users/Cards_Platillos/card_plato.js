import React, {useEffect, useState} from 'react';
import AgregarCarrito from './AgregarCarrito/agregarCarrito';
import {formatoMexico, verificarDiasLaborales} from '../../../config/reuserFunction'
import { Box, Button, Dialog,  Divider,  Drawer,  Grid, Hidden, IconButton, Paper, Tooltip, AppBar, Toolbar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import CloseIcon from '@material-ui/icons/Close';
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
		localStorage.removeItem("codigoIndividual");
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
						<Grid
							style={{ paddingBottom: 12 }}
							container 
							onClick={
							() => {
								handleClickOpen()
								setagregarProducto(producto)
							}} 
						>
							<Grid item xs={4}>
								<Box pl={1} pt={1}>
								<Paper elevation={3} className={classes.coverResponsive}>
									<CardMedia
										id={producto._id}
										className={classes.coverResponsive}
										image={producto.imagenProductUrl}
										title="Imagen de producto"
									/>
								</Paper>
								</Box>
							</Grid>
							<Grid item xs={8}>
								<Box display="flex" textAlign="left" alignItems="center" variant="h2">
									<Box flexGrow={1}>
										<Typography >
											<b>{producto.name} </b>
										</Typography>
									</Box>
									<Box style={{ padding: '0%'}}>
										<IconButton 
											style={{ padding: '0%', paddingRight: 6}}
											variant="contained" 
											color="primary" 
											onClick={() => {
												handleClickOpen()
												setagregarProducto(producto)
											}} 
										>
											<AddCircleIcon style={{ padding: '0%', fontSize: 40}}/>
										</IconButton>
									</Box>
								</Box>
								<Grid item xs zeroMinWidth>
									<Box mt={1} display="flex" textAlign="left" >
										<Typography noWrap variant="h2">
											{producto.description} 
										</Typography>
									</Box>
								</Grid>
								<Box mt={1} display="flex" textAlign="left" >
									<Typography variant="h4">
										<b>${formatoMexico(producto.price)}</b>
									</Typography>
								</Box>
							</Grid>
						</Grid>
						<Grid  item  lg={12} xs={12}>
							<Divider variant="inset:" />
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
					<Grid container justify="flex-end">
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon style={{fontSize: 35}} />
						</IconButton>
					</Grid>
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
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
								<CloseIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
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