import { Box, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import React, { Fragment } from 'react'

import useStyles from '../estilos';

const stylesLocal = makeStyles((theme) => ({
    precio:{
        fontSize: 30,
        color: '#bb2225',
        textAlign: 'center'
    },
    fondoColor:{
        background: '#FFE8E8',
    },
    divisorPrincipal:{
        marginLeft: '39%',
        width: '20%',
        background: '#bb2225'
    },
}))

export default function Paquetes() {

    const estilo = stylesLocal();

    return (
            <Container>
                <Grid container spacing={1} >
                        <Grid lg={12} xs={11}>
                            <Typography component="div" variant="h4" color="primary">
                                <Box textAlign="center" mt={5}>
                                    Adquiere uno de nuestros paquetes
                                </Box>
                            </Typography>
                            <Box p={1} textAlign="center" mt={1}> 
                                <Divider className={estilo.divisorPrincipal}/>
                            </Box>
                            <Typography component="div" variant="h6">
                                <Box textAlign="center" p={1}>
                                    Adquiere el mejor plan que se adapte a tus necesidades y a las de tu negocio
                                </Box>
                            </Typography>
                            <Box p={1} textAlign="center" mt={1}> 
                                <Divider className={estilo.divisorPrincipal} />
                            </Box>
                        </Grid>
                        <Grid container justify="center">
                            <Grid lg={5} md={4} xs={11}>
                                <Box textAlign="center" mt={3} p={3} className={estilo.fondoColor}>
                                    <Typography variant="h4">
                                        Basico
                                    </Typography>
                                </Box>
                                <Box mt={2}>
                                    <Typography  className={estilo.precio}>
                                        $300 / Mes
                                    </Typography>
                                </Box>
                                <Box mt={4} className={estilo.fondoColor} >
                                    <Box p={1} display="flex" justifyContent="center" >
                                        <Typography variant="h6" >
                                            <DoneIcon /> Recibir pedidos WhatsApp
                                        </Typography>
                                    </Box>
                                    <Box p={1} display="flex" justifyContent="center" >
                                        <Typography  variant="h6" >
                                            <DoneIcon /> Generar Codigo QR
                                        </Typography>
                                    </Box>
                                    <Box p={1} display="flex" justifyContent="center" >
                                        <Typography  variant="h6" >
                                            <DoneIcon /> Recibir Reservaciones
                                        </Typography>
                                    </Box>
                                    <Box p={1} display="flex" justifyContent="center" >
                                        <Typography  variant="h6" >
                                            <DoneIcon /> Editar Publicidad
                                        </Typography>
                                    </Box>
                                    <Box p={1} display="flex" justifyContent="center" >
                                        <Typography  variant="h6" >
                                            <DoneIcon /> SubDominio GRATIS
                                        </Typography>
                                    </Box>
                                    <Box p={1} display="flex" justifyContent="center" >
                                        <Typography  variant="h6" >
                                            <DoneIcon /> Espacio ILIMITADO
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                           
                            <Grid lg={5} md={4} xs={11}>
                                <Box textAlign="center" mt={3} p={3} className={estilo.fondoColor}> 
                                    <Typography  variant="h4">
                                        Paquete Publicitario
                                    </Typography>
                                </Box>
                                <Box mt={2}>
                                    <Typography className={estilo.precio}>
                                        $500 (Un solo pago)
                                    </Typography>
                                </Box>
                                <Box mt={4} className={estilo.fondoColor} >
                                    <Box p={1} display="flex" justifyContent="center" >
                                        <Typography variant="h6" >
                                            <DoneIcon /> 3 Imagenes publcitarias (Banners)
                                        </Typography>
                                    </Box>
                                    <Box p={1} display="flex" justifyContent="center" >
                                        <Typography  variant="h6" >
                                            <DoneIcon /> Subir todos tus productos a tu pagina
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box mt={2}>
                                    <Typography  className={estilo.precio}>
                                        $300 / Renta Mensual
                                    </Typography>
                                </Box>
                                <Box p={3} mt={3} className={estilo.fondoColor}>
                                    <Box p={1} display="flex" justifyContent="center" >
                                        <Typography  variant="h6" >
                                            <DoneIcon /> Paquete Basico
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
            </Container>
    )
}
