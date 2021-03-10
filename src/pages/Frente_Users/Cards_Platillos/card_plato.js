import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import {formatoMexico} from '../../../config/reuserFunction'


import useStyles from './styles';
import { Avatar, Box, Dialog, Grid, Hidden, IconButton } from '@material-ui/core';
import AgregarCarrito from './agregarCarrito';
import clienteAxios from '../../../config/axios';
import './styles.scss';

export default function Cards_Platos(props) {
	const {productos} = props;
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	
	const [agregarProducto, setagregarProducto] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

	const render = productos.map((producto, index) => {
		return (
			<Grid key={index} item lg={5} className={classes.paper}>
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
							<Grid xs zeroMinWidth >
								<Box display="flex" justifyContent="center">
									<Typography className={classes.rootTitulo} variant="h5" noWrap>
										{producto.name}
									</Typography>
								</Box>
							</Grid>
							<Grid item xs zeroMinWidth>
								<Typography variant="subtitle1" color="textSecondary">
									{producto.description}
								</Typography>
							</Grid>
							<Grid item xs zeroMinWidth>
								<Typography variant="h4" color="textSecondary">
									${formatoMexico(producto.price)} 
								</Typography>
							</Grid>
							<Grid lg={12}>
								<IconButton
									onClick={() => {
									handleClickOpen()
									setagregarProducto(producto)
									}}
								>
									<AddShoppingCartIcon className={classes.large} />
								</IconButton>
							</Grid>
						</Grid>	
						</Box>
					</Card>
			</Grid>
			
		);
	})

	return (
		<div>
			<Grid container justify="center">
                {render}
            </Grid>

			<Dialog open={open} onClose={handleClose} >
				<AgregarCarrito  nombre={agregarProducto.name} precio={agregarProducto.price} setOpen={setOpen}  />
			</Dialog>
			
		</div>
	
	);
	}

// <Container xl>
// 	<Grid container lg={12}>
// 		<Cards_Platos/>
// 	</Grid>
// </Container>