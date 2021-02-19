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
import { Grid, Tooltip } from '@material-ui/core';

export default function Cards_Platos() {
  const classes = useStyles();
  const theme = useTheme();
  const [contador , setContador] = useState(0)

	const Agregar = () => {
		setContador(contador+1);
	}; 
	const Quitar = () => {
		setContador(contador-1);
	}; 
  
  return (
	<Grid lg={5}>
		<Card className={classes.root}>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography component="h5" variant="h5">
						Plato de Pozole 
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Rico pozole mexicano de Izxtapa Cihuatlnejo
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
						<IconButton >
							<AddShoppingCartIcon />
						</IconButton>
					</Tooltip>
				</div>
			</div>
			<CardMedia
				className={classes.cover}
				image="/static/images/cards/live-from-space.jpg"
				title="Live from space album cover"
			/>
		</Card>
	</Grid>
  );
}