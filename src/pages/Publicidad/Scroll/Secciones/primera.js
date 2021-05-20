import { Box, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { Fragment } from 'react'
import { IconButton } from '@material-ui/core';
import imagen from '../../img/PublicidadComody.png'

import FastfoodIcon from '@material-ui/icons/Fastfood';
import EditIcon from '@material-ui/icons/Edit';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CropFreeIcon from '@material-ui/icons/CropFree';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    divisorPrincipal:{
        marginLeft: '39%',
        width: '20%',
        background: '#bb2225'
    },
    containerImg:{
        width: "80%",
        height: '100%'
    },
    imagen:{
        maxHeight: '100%',
		maxWidth: '100%'
    },
}))

export default function Primera() {

    const classes = useStyles();

    return (
        <Fragment>
            <Container>
            <Grid container spacing={1} >
                {/* SECCIONES DE TITULOS */}
                <Grid item xs={12} >
                    <Box textAlign="center" mt={1}>
                        <Typography variant="h4" color="primary" >
                            Gestiona tu propio menú en linea
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Divider className={classes.divisorPrincipal}/>
                    </Box>
                    <Box textAlign="center" mt={1}>
                        <Typography variant="h6" >
                            Una lista de maravillosas funciones para ti como Administrador.
                        </Typography>
                    </Box>
                    <Box mt={2} mb={5}>
                        <Divider className={classes.divisorPrincipal} />
                    </Box>
                </Grid>
                {/* FIN SECCION DE TITULOS */}
            
                {/* INCIIO DE CONTENIDO PRINCIPAL */}
                <Grid container >
                    <Grid container item lg={4} xs={12}>
                        <Grid item xs={10}>
                            <Box >
                                <Typography component="div" variant="h5" color="primary">
                                    <Box textAlign="right" mt={2}>
                                        Agregar Platillos
                                    </Box>
                                </Typography>
                                <Typography component="div" variant="h6">
                                    <Box textAlign="right" mt={2}>
                                        Podrás agregar todos los platillos que desees sin límite de espacio
                                    </Box>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt="50%">
                                <IconButton>
                                    <FastfoodIcon className={classes.large} color="primary"/>
                                </IconButton>
                            </Box>
                        </Grid>

                        <Grid item xs={10}>
                            <Box >
                                <Typography component="div" variant="h5" color="primary" >
                                    <Box textAlign="right" mt={2}>
                                        Editar Platillos
                                    </Box>
                                    </Typography>
                                    <Typography component="div" variant="h6">
                                    <Box textAlign="right" mt={2}>
                                        Si tus platillos sufren cambios podrás actualizarlos en cualquier momento 
                                    </Box>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt="50%">
                                <IconButton>
                                    <EditIcon className={classes.large} color="primary"/>
                                </IconButton>
                            </Box>
                        </Grid>

                        <Grid item xs={10}>
                            <Box >
                                <Typography component="div" variant="h5" color="primary" >
                                    <Box textAlign="right" mt={2}>
                                        Publicidad
                                    </Box>
                                </Typography>
                                <Typography component="div" variant="h6">
                                    <Box textAlign="right" mt={2}>
                                        Tendrás tu propio carrusel publicitario, el cual podrás editar cuantas veces desees
                                    </Box>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt="50%">
                                <IconButton>
                                    <ViewCarouselIcon className={classes.large} color="primary"/>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item lg={4} xs={12} >
                        <Box mb={5}>
                            <Box display="flex" justifyContent="center" ml={5} className={classes.containerImg} >
                                <img 
                                    className={classes.imagen}
                                    src={imagen}
                                    alt="Celular" 
                                />
                            </Box>
                        </Box>
                    </Grid>

                    <Grid container item lg={4} xs={12}>
                        <Grid item xs={2}>
                            <Box mt="50%">
                                <IconButton>
                                    <WhatsAppIcon className={classes.large} color="primary"/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={10}>
                            <Box ml={3}>
                                <Typography component="div" variant="h5" color="primary" >
                                    <Box textAlign="left" mt={2}>
                                        Pedidos a WhatsApp
                                    </Box>
                                </Typography>
                                <Typography component="div" variant="h6">
                                    <Box textAlign="left" mt={2}>
                                        Todos los pedidos que realicen tus clientes se redireccionan directo al WhatsApp que tu definas, que podrás editar las veces que sea necesario
                                    </Box>
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={2}>
                            <Box mt="50%">
                                <IconButton>
                                    <CropFreeIcon className={classes.large} color="primary"/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={10}>
                            <Box ml={3}>
                                <Typography component="div" variant="h5" color="primary" >
                                    <Box textAlign="left" mt={2}>
                                        ¡Código QR!
                                    </Box>
                                </Typography>
                                <Typography component="div" variant="h6">
                                    <Box textAlign="left" mt={2}>
                                        Genera un Código QR único para que tus clientes puedan encontrarte de una manera más rápida.
                                    </Box>
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={2}>
                            <Box mt="50%">
                                <IconButton>
                                    <RestaurantMenuIcon className={classes.large} color="primary"/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={10}>
                            <Box ml={3}>
                                <Typography component="div" variant="h5" color="primary" >
                                    <Box textAlign="left" mt={2}>
                                        Reservaciones
                                    </Box>
                                </Typography>
                                <Typography component="div" variant="h6">
                                    <Box textAlign="left" mt={2}>
                                        Tus clientes podrán solicitar disponibilidad a tu restaurante, la cual llegara directo a tu WhatsApp
                                    </Box>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                {/* find e contenido princiapl */}
            </Grid>
            </Container>
        </Fragment>
    )
}
