import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import useStyles from './styles';
import { Box, Grid, Tooltip } from '@material-ui/core';

import imagen from '../img/pozole.jpg'

export default function Cards_Platos() {
  const classes = useStyles();
  const theme = useTheme();
  const [contador , setContador] = useState(0)

  const [carrito, setCarrito] = useState([]);

	const Agregar = () => {
		setContador(contador+1);
	}; 
	const Quitar = () => {
		setContador(contador-1);
	};

	var platillos = [
		{ 
			nombre: 'kevin11', 
			cantidad:  contador, 
			precio: 1200 
		}
	];
	
	const agregarCarrito = () => {
		carrito.push(platillos)
		localStorage.setItem('usuario', JSON.stringify(carrito));
	}

	const pedido = JSON.parse(localStorage.getItem('usuario'))

	return (
		<Grid lg={5}>
			<Card className={classes.root}>
				<CardMedia
					className={classes.cover}
					image={imagen}
					title="Live from space album cover"
				/>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography component="h5" variant="h5">
							Plato de Pozole 
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							Mariscos
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							Rico pozole mexicano de Izxtapa Cihuatlnejo
						</Typography>
						<Typography variant="h5" color="textSecondary">
							$120
						</Typography>
					</CardContent>
					<div className={classes.controls}>
						<IconButton aria-label="play/pause" onClick={()=> Agregar() }>
							<AddIcon />
						</IconButton>
						<Typography variant="h4">
							{contador}
						</Typography>
						<IconButton aria-label="play/pause" onClick={()=> Quitar() }>
							<RemoveIcon />
						</IconButton>
						<Tooltip title="Agregar a Carrito" aria-label="add">
							<IconButton 
								size="large"
								onClick={() => agregarCarrito()}
							>
								<AddShoppingCartIcon />
							</IconButton>
						</Tooltip>
						
					</div>
				</div>
			</Card>
		</Grid>
	);
	}

// <Container xl>
// 	<Grid container lg={12}>
// 		<Cards_Platos/>
// 	</Grid>
// </Container>