import { Box, Button, Container, Divider, Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
import React, { Fragment } from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll';

import imagen from '../../img/PublicidadComodyDoble.png'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    divisorPrincipal:{
        marginTop: "6%",
        background: '#bb2225'
    },
    containerImage:{
        width: "90%",
        height: '100%'
    },
    margenes:{
        textAlign: "left"
    },
    containerImg:{
        width: "70%",
        height: '70%'
    },
    imagen:{
        maxHeight: '100%',
		maxWidth: '100%'
    },
}))


export default function Tercera() {

    const classes = useStyles();

    return (
            <Grid container >
                <Grid item lg={7} xs={12} >
                    <Box className={classes.containerImage}>
                        <img 
                            className={classes.imagen}
                            src={imagen}
                            alt="Comody" 
                        />
                    </Box>
                </Grid>
                <Grid item lg={5} xs={11}>
                    <Typography component="div" variant="h4" color="primary">
                        <Box p={2} textAlign="left">
                            Grandes beneficios en tu propio Menú Digital
                        </Box>
                    </Typography>
                    
                    <Typography component="div" variant="h6">
                        <Box  p={1} display="flex" alignItems="center" className={classes.margenes}>
                            <Box display="flex" alignItems="center" p={1}>
                                <DoneAllIcon color="primary" />
                            </Box>
                            <Box>
                                Lograr editar la información de página sin ayuda de nadie mas
                            </Box>
                        </Box>
                        <Box p={1} display="flex" alignItems="center" className={classes.margenes}>
                            <Box  display="flex" alignItems="center" p={1}>
                                <DoneAllIcon color="primary" />
                            </Box>
                            <Box>
                                Tendrás tu propio subdominio dentro de la web para ser localizado más fácil
                            </Box>
                        </Box>
                        <Box p={1} display="flex" alignItems="center" className={classes.margenes}>
                            <Box  display="flex" alignItems="center" p={1}>
                                <DoneAllIcon color="primary" />
                            </Box>
                            <Box>
                                Tus usuarios tendrán una mayor experiencia al pedir de forma online
                            </Box> 
                        </Box>
                        <Box p={1} display="flex" alignItems="center" className={classes.margenes}>
                            <Box  display="flex" alignItems="center" p={1}>
                                <DoneAllIcon color="primary" />
                            </Box>
                            <Box>
                                Todos los pedidos llegaran a tu WhatsApp, con las características y notas que tus clientes deseen agregar
                            </Box>
                        </Box>
                        <Box p={1} textAlign="center" >
                           <Typography textAlign="center" variant="h6">
                               <b>Comienza desde ahora y registrate complemetamente GRATIS en nuestra plataforma digital</b>
                           </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                component={Link}
                                to="/register"
                            >
                               <Typography variant="h6">
                                <b>Registrarme</b> 
                               </Typography>
                            </Button>
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
    )
}
