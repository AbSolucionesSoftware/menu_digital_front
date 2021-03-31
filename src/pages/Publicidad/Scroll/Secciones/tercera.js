import { Box, Container, Divider, Grid, Hidden, makeStyles, Typography } from '@material-ui/core';
import React, { Fragment } from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll';

import imagen from '../../img/PublicidadComodyDoble.png'

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
        width: "100%",
        height: '100%'
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
                <Grid lg={7} xs={12} >
                    <Box className={classes.containerImage}>
                        <img 
                            className={classes.imagen}
                            src={imagen}
                            alt="Comody" 
                        />
                    </Box>
                </Grid>
                <Grid lg={5} xs={11}>
                    <Typography component="div" variant="h4" color="primary">
                        <Box p={2} textAlign="left">
                            Gerandes beneficios en tu propio Menú Digital
                        </Box>
                    </Typography>
                    
                    <Typography component="div" variant="h6">
                        <Box  p={1} display="flex" alignItems="center" className={classes.margenes}>
                            <Box display="flex" alignItems="center" p={1}>
                                <DoneAllIcon color="primary" />
                            </Box>
                            <Box>
                                Lograr editar la informacion de pagina sin ayuda de nadie mas
                            </Box>
                        </Box>
                        <Box p={1} display="flex" alignItems="center" className={classes.margenes}>
                            <Box  display="flex" alignItems="center" p={1}>
                                <DoneAllIcon color="primary" />
                            </Box>
                            <Box>
                                Tendras tu propio subdominio dentro de la web para ser localizado mas facil
                            </Box>
                        </Box>
                        <Box p={1} display="flex" alignItems="center" className={classes.margenes}>
                            <Box  display="flex" alignItems="center" p={1}>
                                <DoneAllIcon color="primary" />
                            </Box>
                            <Box>
                                Tus usuarios tendran una mayor experiencia al pedir de forma online
                            </Box> 
                        </Box>
                        <Box p={1} display="flex" alignItems="center" className={classes.margenes}>
                            <Box  display="flex" alignItems="center" p={1}>
                                <DoneAllIcon color="primary" />
                            </Box>
                            <Box>
                                Todos los pedidos llegaran a tu WhatsApp, con las caracteristicas y nnotas que tus clientes deseen agregar
                            </Box>
                        </Box>
                        <Box p={1} display="flex" alignItems="center" className={classes.margenes}>
                            <Box  display="flex" alignItems="center" p={1}>
                                <DoneAllIcon color="primary" />
                            </Box>
                            <Box>
                                Tendras tu espacio dentro de nuestra publicidad para tener un mayor crecimiento ante los usuarios
                            </Box>
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
    )
}
