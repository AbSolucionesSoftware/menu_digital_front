import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';
import { Box, Dialog, Grid } from '@material-ui/core';
import imagen from '../img/pozole.jpg'
import AgregarCarrito from './agregarCarrito';

export default function Cards_Platos() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

	var platillos =
		{ 
			nombre: 'Pozole', 
			precio: 1200,
		}
	;

	return (
		<Grid container>
			<Box justifyContent="center" display="flex" flexWrap="wrap">

			<Grid lg={5}>
				<Box p={2}>
					<Card onClick={handleClickOpen} className={classes.root}>
						<Box justifyContent="center" display="flex" flexWrap="wrap">
							<CardMedia
								className={classes.cover}
								image={imagen}
								title="Live from space album cover"
							/>

							<div className={classes.details}>
								<CardContent className={classes.content}>
									<Typography variant="h4">
										Plato de Pozole 
									</Typography>
									<Typography variant="subtitle1" color="textSecondary">
										Mariscos
									</Typography>
									<Typography variant="subtitle1" color="textSecondary">
										Rico pozole mexicano de Izxtapa Cihuatlnejo
									</Typography>
									<Typography variant="h4" color="textSecondary">
										$120
									</Typography>
								</CardContent>
							</div>
						</Box>
					</Card>
				</Box>
			
		</Grid>

		<Grid lg={5}>
			<Box p={2}>
				<Card onClick={handleClickOpen} className={classes.root}>
					<Box justifyContent="center" display="flex" flexWrap="wrap">
						<CardMedia
							className={classes.cover}
							image={imagen}
							title="Live from space album cover"
						/>

						<div className={classes.details}>
							<CardContent className={classes.content}>
								<Typography variant="h4">
									Plato de Pozole 
								</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									Mariscos
								</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									Rico pozole mexicano de Izxtapa Cihuatlnejo
								</Typography>
								<Typography variant="h4" color="textSecondary">
									$120
								</Typography>
							</CardContent>
						</div>
					</Box>
				</Card>
			</Box>
		</Grid>

		<Grid lg={5}>
			<Box p={2}>
				<Card onClick={handleClickOpen} className={classes.root}>
					<Box justifyContent="center" display="flex" flexWrap="wrap">
						<CardMedia
							className={classes.cover}
							image={imagen}
							title="Live from space album cover"
						/>

						<div className={classes.details}>
							<CardContent className={classes.content}>
								<Typography variant="h4">
									Plato de Pozole 
								</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									Mariscos
								</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									Rico pozole mexicano de Izxtapa Cihuatlnejo
								</Typography>
								<Typography variant="h4" color="textSecondary">
									$120
								</Typography>
							</CardContent>
						</div>
					</Box>
				</Card>
			</Box>
		</Grid>
		</Box>

		
		<Dialog open={open} onClose={handleClose} >
			<AgregarCarrito  setOpen={setOpen} platillos={platillos} />
		</Dialog>
		</Grid>
	
	);
	}

// <Container xl>
// 	<Grid container lg={12}>
// 		<Cards_Platos/>
// 	</Grid>
// </Container>