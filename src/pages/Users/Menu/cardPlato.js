import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, Hidden, Avatar, Drawer, FormControlLabel, Switch } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../../config/axios';
import Eliminar from './services/eliminar';
import RegistroProducto from './services/registroProducto';
import useStyles from './styles';
import Publicar from './services/publicar';
import {formatoMexico} from '../../../config/reuserFunction'

export default function CardPlato(props) {
    const {productos, setUpload, upload} = props;
    const classes = useStyles();
    const [ open, setOpen ] = useState(false);
    const [editarProducto, setEditarProducto] = useState({})

    const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
        setUpload(!upload);
		setOpen(false);
	};

    const render = productos.map((producto, index) => {
        return(
        <Grid key={producto._id} item lg={5} xs={12} className={classes.paper}>
            <Card  className={classes.root}> 
                <Box display="flex" flexWrap="wrap">
                    <Grid item lg={5} xs={12}>
                        <Hidden mdUp>
                            <Box p={1} display="flex" justifyContent="center" alignContent="center" >
                                <Avatar  className={classes.large} alt="Remy Sharp" src={producto.imagenProductUrl} />
                            </Box>
                        </Hidden>
                        <Hidden smDown>
                            <CardMedia
                                id={producto._id}
                                className={classes.cover}
                                image={producto.imagenProductUrl}
                                title="Imagen de producto"
                            />
                        </Hidden>
                    </Grid>
                    <Grid item lg={7} xs={12}>
                        <Grid item xs zeroMinWidth>
                            <Box display="flex" justifyContent="center">
                                <Typography  className={classes.rootTitulo} variant="h5" noWrap>
                                    {producto.name}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs zeroMinWidth >
                            <Box display="flex" justifyContent="center">
                                <Typography className={classes.rootTitulo} variant="h6" noWrap>
                                    {producto.description} 
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h4" color="textSecondary">
                               ${formatoMexico(producto.price)} 
                            </Typography>
                        </Grid>

                        <Box p={1} display="flex" justifyContent="center">
                            <Box p={1}>
                                <Button
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => {
                                        handleDrawerOpen()
                                        setEditarProducto(producto)
                                    }}
                                >
                                    Editar
                                </Button>
                            </Box>
                            <Box p={1}>
                                <Eliminar setUpload={setUpload} upload={upload}  platillo={producto._id}/>
                            </Box>
                        </Box>
                        <Box>
                            <Publicar producto={producto} setUpload={setUpload} upload={upload} />
                        </Box>
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
            
            <Drawer
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                
                <RegistroProducto 
                    setUpload={setUpload}
                    upload={upload}
                    editarProducto={editarProducto}
                    handleDrawerClose={handleDrawerClose}
                />
                    {/* <Box textAlign="center" mt={1}>
                        <Button
                            variant="contained" 
                            color="secondary"
                            size="large"
                            onClick={handleDrawerClose}
                        >
                            Salir
                        </Button>
                    </Box> */}
            </Drawer>
        </div>
    )
}
