import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from '../estilos';
import ImagenOne from '../../image/regalo.PNG'
import ImagenDos from '../../image/regalo2.PNG'
import ImagenSupport from '../../image/support.PNG'


const stylesLocal = makeStyles((theme) => ({
   containerImagen:{
        width: 180,
        height: '100%',
   },
}))


export default function Awesome() {

    const classes = useStyles();
    const estilo = stylesLocal();


    return (
        <div>
                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                    >
                        {/* Secciones de titulos */}
                        <Grid xs={10} >
                            <Box pb={5}>
                                <Typography component="div" variant="h4">
                                    <Box textAlign="center" mt={5}>
                                        Beneficios incleibles!
                                    </Box>
                                </Typography>
                                <Box textAlign="center" mt={1}> 
                                    <Divider className={classes.divisorPrincipal}/>
                                </Box>
                                <Typography component="div" variant="body1">
                                    <Box textAlign="center" mt={3}>
                                        Adquiere grandiosos beneficios con nosotros al adquirir tu propia tienda
                                    </Box>
                                </Typography>
                                <Box textAlign="center" mt={1}> 
                                    <Divider className={classes.divisorPrincipal}/>
                                </Box>
                            </Box>
                        </Grid>
                        {/* Secciones de regalos */}
                        <Grid container justify="center"
                        alignItems="center">
                            <Grid xs={10} lg={3}>
                                <Box>
                                    <Box textAlign="center" >
                                        <img 
                                            className={estilo.containerImagen}
                                            src={ImagenOne}
                                            alt="Regalo" 
                                        />
                                    </Box>
                                    <Typography component="div">
                                        <Box textAlign="center" mt={5} className={classes.tituloSec}>
                                            Tu propio Dominio
                                        </Box>
                                        <Box textAlign="center" pr={3} pl={3} className={classes.tipografia} mt={2}>
                                            Adquiere tu propio dominio, que sea tan unico como tu negocio, para que tus clientes te identifiquen mas rapido en la Web.                                            
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid xs={10} lg={3}>
                            <Box>
                                    <Box textAlign="center" >
                                        <img 
                                            className={estilo.containerImagen}
                                            src={ImagenDos}
                                            alt="Regalo" 
                                        />
                                    </Box>
                                    <Typography component="div">
                                        <Box textAlign="center" mt={5} className={classes.tituloSec}>
                                            Almacenamiento
                                        </Box>
                                        <Box textAlign="center" pr={3} pl={3} className={classes.tipografia} mt={2}>
                                            No deberas preocuparte por una relacion dentro del almacenamiento y podras registrar los productos que quieras.                                            
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid xs={10} lg={3}>
                                <Box>
                                    <Box textAlign="center" >
                                        <img 
                                            className={estilo.containerImagen}
                                            src={ImagenSupport}
                                            alt="Regalo" 
                                        />
                                    </Box>
                                    <Typography component="div">
                                        <Box textAlign="center" mt={5} className={classes.tituloSec}>
                                            Variedad de Diseños
                                        </Box>
                                        <Box textAlign="center" pr={3} pl={3} className={classes.tipografia} mt={2}>
                                            Al adquirir tu tienda en linea podras elegir entre algunos de nuestros diferentes templates que tenemos para ofrecerte.
                                            Con un diseño sorprendente para tus clientes.
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
        </div>
    )
}
