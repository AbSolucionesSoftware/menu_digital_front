import React, {useEffect, useState} from 'react';
import AgregarCarrito from './agregarCarrito';
import {formatoMexico} from '../../../config/reuserFunction'

import { Avatar, Box, Dialog, Grid, Hidden, IconButton } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';

import comody from '../../../img/c.jpeg'
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

	const render = productos.map((producto, index) => {
		return (
			<Grid key={index} item lg={6} xs={12} className={classes.paper}>
            	<Card className={classes.root}> 
               		<Box display="flex" flexWrap="wrap">
						<Grid item lg={5} xs={12}>
								<Hidden mdUp>
									<Box p={1} display="flex" justifyContent="center" alignContent="center" >
										<Avatar  className={classes.large} alt="Remy Sharp" src={producto.imagenProductUrl} />
									</Box>
								</Hidden>
								<Hidden smDown>
									<CardMedia
										className={classes.cover}
										image={producto.imagenProductUrl}
									/>
								</Hidden>
						</Grid>
						<Grid lg={7} xs={12}>
							<Box p={1}>
								<Grid xs zeroMinWidth >
									<Box display="flex" justifyContent="center">
										<Typography className={classes.rootTitulo} variant="h5" noWrap>
											{producto.name}
										</Typography>
									</Box>
								</Grid>
								
								<Grid xs zeroMinWidth >
									<Box display="flex" justifyContent="center">
										<Typography className={classes.rootTitulo} variant="subtitle1" noWrap>
											{producto.description} 
										</Typography>
									</Box>
								</Grid>
								<Grid item xs zeroMinWidth>
									<Typography variant="h4" color="textSecondary">
										${formatoMexico(producto.price)} 
									</Typography>
								</Grid>
								{sesion ? (
									null
								) : (
									<Grid lg={12}>
										<IconButton
											color="secondary" 
											onClick={() => {
											handleClickOpen()
											setagregarProducto(producto)
											}}
										>
											<AddShoppingCartIcon color="secondary" className={classes.largeCar} />
										</IconButton>
									</Grid>
								)}
							</Box>
						</Grid>	
						</Box>
					</Card>
			</Grid>
			
		);
	})

	return (
		<div>
			<Grid container justify="center" alignItems="center">
                {render}
            </Grid>

			<Dialog open={open} onClose={handleClose} >
				<AgregarCarrito descripcion={agregarProducto.description} nombre={agregarProducto.name} precio={agregarProducto.price} setOpen={setOpen}  />
			</Dialog>
			
		</div>
	
	);
	}

// <Container xl>
// 	<Grid container lg={12}>
// 		<Cards_Platos/>
// 	</Grid>
// </Container>