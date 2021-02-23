import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import RemoveIcon from '@material-ui/icons/Remove';

import useStyles from '../styles';
import { Box, Button, Grid } from '@material-ui/core';


export default function Cards_Restaurate() {
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
	<Grid lg={7}>
		<Card className={classes.root}>
			<Grid container>
				<Grid lg={6} xs={12}>
					<CardContent className={classes.content}>
						<Box textAlign="center" mt={2}>
							<Typography component="h5" variant="h5">
								KrispyChiken
							</Typography>
							<Typography variant="subtitle1" color="h6">
								Diego de leon
							</Typography>
							<Typography variant="subtitle1" color="h6">
								3171234567
							</Typography>
						</Box>
					</CardContent>
				</Grid>
				<Grid lg={6} xs={12}>
					<Box textAlign="center" p={1}>
						<Button className={classes.boton} variant="contained" color="primary">
							Publicar
						</Button>
					</Box>
					<Box textAlign="center" p={1}>
						<Button className={classes.boton} variant="contained" color="primary">
							Editar
						</Button>
					</Box>
					<Box textAlign="center" p={1}>
						<Button className={classes.boton} variant="contained" color="secondary">
							Eliminar
						</Button>
					</Box>
				</Grid>
			</Grid>
				
				{/* <div className={classes.controls}>
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
				</div> */}
		</Card>
	</Grid>
  );
}