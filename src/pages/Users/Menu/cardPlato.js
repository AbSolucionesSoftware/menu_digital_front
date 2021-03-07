import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, Hidden, Avatar, Drawer } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../../config/axios';
import Eliminar from './services/eliminar';
import RegistroProducto from './services/registroProducto';
import useStyles from './styles';

export default function CardPlato(props) {
    const {productos} = props;

    const classes = useStyles();

    const [ open, setOpen ] = useState(false);

    const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

    const render = productos.map((producto, index) => {
        return(
        <Grid item lg={5} className={classes.paper}>
            <Card key={index} className={classes.root}> 
                {console.log(producto)}
                <Box display="flex" flexWrap="wrap">
                    <Hidden mdUp>
                        <Box p={3} display="flex" justifyContent="center" alignContent="center" >
                            <Avatar  className={classes.large} alt="Remy Sharp" src={producto.imagenProductUrl} />
                        </Box>
                    </Hidden>
                    <Hidden smDown>
                        <CardMedia
                            className={classes.cover}
                            image={producto.imagenProductUrl}
                        />
                    </Hidden>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography  variant="h5">
                                {producto.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                               {producto.category}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {producto.description}
                            </Typography>
                        </CardContent>
                        <Box p={0} display="flex" justifyContent="center">
                            <Box p={1}>
                                <Button
                                    variant="contained" 
                                    color="primary"
                                    size="medium"
                                    onClick={handleDrawerOpen}
                                >
                                    Editar
                                </Button>
                            </Box>
                            <Box p={1}>
                                <Eliminar platillo={producto._id}/>
                            </Box>
                        </Box>
                    </div>
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
            

            <Drawer
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <RegistroProducto />
                <Box textAlign="center" mt={4}>
                    <Button
                        variant="contained" 
                        color="secondary"
                        size="large"
                        onClick={handleDrawerClose}
                    >
                        Salir
                    </Button>
                </Box>
            </Drawer>
        </div>
    )
}
