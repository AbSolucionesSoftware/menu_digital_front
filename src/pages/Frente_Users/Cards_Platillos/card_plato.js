import React, {useEffect, useState} from 'react';
import AgregarCarrito from './agregarCarrito';
import {formatoMexico} from '../../../config/reuserFunction'

import { Avatar, Box, Button, Dialog,  Divider,  Drawer,  Grid, Hidden, IconButton, Tooltip, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import Typography from '@material-ui/core/Typography';

import comody from '../../../img/c.jpeg'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import './styles.scss';
import Sesion from '../../../components/Verificacion_sesion/verificacion_sesion';

export default function Cards_Platos(props) {
	const {productos} = props;
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
			<Hidden smDown>
				<Grid key={index} item lg={6} className={classes.paper}>
					<Card className={classes.root}>
					
						<Box display="flex" flexWrap="wrap">
							<Grid item lg={5}>
								<Hidden smDown>
									<CardMedia
										className={classes.cover}
										image={producto.imagenProductUrl}
									/>
								</Hidden>
							</Grid>
							<Grid lg={7}>
								<Box p={1}>
									<Tooltip title={producto.name} placement="top">
										<Grid xs zeroMinWidth >
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
										<Grid lg={12}>
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
									)}
								</Box>
							</Grid>	
						</Box>
					</Card>
				</Grid>
			</Hidden>
			<Hidden mdUp>
				<Grid key={index} item xs={12} className={classes.paper}>
				{/* <Card> */}
					<Grid container>
						<Grid xs={8} >
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
						<Grid xs={2}>
							<Grid >
								<Box display="flex" alignItems="center" justifyContent="center" flexDirection="row">
									<Typography variant="h5" style={{fontWeight: 600}}>
										${formatoMexico(producto.price)} 
									</Typography>
								</Box>
							</Grid>
						</Grid>
						<Grid xs={2}>
							<Grid xs zeroMinWidth >
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
					<Grid lg={12} xs={12}>
						<Divider variant="inset:" />
					</Grid>
				{/* </Card> */}
				</Grid>
			</Hidden>
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