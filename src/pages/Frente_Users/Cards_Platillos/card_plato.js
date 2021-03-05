import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import { Avatar, Box, Dialog, Grid, Hidden, IconButton } from '@material-ui/core';
import AgregarCarrito from './agregarCarrito';
import clienteAxios from '../../../config/axios';
import './styles.scss';

export default function Cards_Platos(props) {
	const {empresa} = props;
	const classes = useStyles();
	
	const [open, setOpen] = useState(false);
	const [productos, setProductos ] = useState([]);
	const [agregarProducto, setagregarProducto] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };



	const consultarProductos = async () => {
		await clienteAxios
			.get(`/product/${empresa._id}`)
			.then((res) => {
				setProductos(res.data);
			})
			.catch((err) => {

			})
	}

    useEffect(() => {
		consultarProductos();
	},
	 []);

	
	var platillos =
		{ 
			nombre: 'Pozole', 
			precio: 1200,
		}
	;

	const render = productos.map((producto) => {
		return (
			<Grid lg={5}>
				{/* {console.log(producto)} */}
				<Box p={2}>
					<Card onClick={() => {
						handleClickOpen()
						setagregarProducto(producto)
						}} className={classes.root}>
						<Box justifyContent="center" display="flex">
							<CardMedia
								className={classes.cover}
								image={producto.imagenProductUrl}
								title="Live from space album cover"
							/>

							<div className={classes.details}>
								<CardContent className={classes.content}>
										<Box display="flex" className="titulos">
											<Typography variant="h4" gutterBottom={false}>
												{producto.name}
											</Typography>
											<IconButton>
												<AddShoppingCartIcon />
											</IconButton>
										</Box>
											<Typography variant="subtitle1" color="textSecondary">
												{producto.subCategory}
											</Typography>
											<Typography variant="subtitle1" color="textSecondary">
												{producto.description}
											</Typography>
											<Typography variant="h4" color="textSecondary">
												{producto.price}
											</Typography>
								</CardContent>
							</div>
						</Box>
					</Card>
				</Box>
				
			</Grid>
			
		);
	})

	return (
		<Grid container>
			<Box justifyContent="center" display="flex" flexWrap="wrap">
				{render}
			</Box>

			<Dialog open={open} onClose={handleClose} >
				<AgregarCarrito  platillos={agregarProducto} setOpen={setOpen}  />
			</Dialog>
			
		</Grid>
	
	);
	}

// <Container xl>
// 	<Grid container lg={12}>
// 		<Cards_Platos/>
// 	</Grid>
// </Container>