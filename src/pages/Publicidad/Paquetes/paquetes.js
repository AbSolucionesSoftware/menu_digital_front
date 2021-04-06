import { Box, Card, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import React, { Fragment } from 'react'

import useStyles from '../estilos';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

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
    root: {
        maxWidth: 480,
        maxHeight: 600
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
                            <Box mt={2} />
                                <Card className={estilo.root}>
                                    <Box textAlign="center" mt={3} p={1}>
                                        <Typography variant="h4">
                                            Basico
                                        </Typography>
                                    </Box>
                                    <Box mt={2} p={2} className={estilo.fondoColor}> 
                                        <Typography  className={estilo.precio}>
                                            $300 / Mes
                                        </Typography>
                                    </Box>
                                    <Box mt={4} >
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography variant="h6" >
                                                <DoneIcon /> Recibir pedidos WhatsApp
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography  variant="h6" >
                                                <DoneIcon /> Generar Código QR
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
                                                <DoneIcon /> Subdominio GRATIS
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography  variant="h6" >
                                                <DoneIcon /> Espacio ILIMITADO
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid lg={5} md={4} xs={11}>
                            <Box mt={2} />
                                <Card className={estilo.root}>
                                    <Box textAlign="center" mt={3} p={1} > 
                                        <Typography  variant="h4">
                                            Paquete Publicitario
                                        </Typography>
                                    </Box>
                                    <Box mt={2} p={2} className={estilo.fondoColor}>
                                        <Typography className={estilo.precio}>
                                            Un solo pago de $500
                                        </Typography>
                                    </Box>
                                    <Box mt={4} >
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography variant="h6" >
                                                <DoneIcon /> 3 Imágenes publicitarias (Banners)
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography  variant="h6" >
                                                <DoneIcon /> Subir todos tus productos a tu pagina
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" alignItems="center" justifyContent="center" >
                                            <Typography  variant="h6" >
                                                <CloseIcon /> No incluye renta mensual
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                            
                        <Grid container justify="center">
                            <Grid lg={5} md={4} xs={11}>
                            <Box mt={2} />
                                <Card className={estilo.root}>
                                    <Box textAlign="center" mt={3} p={1}>
                                        <Typography variant="h4">
                                            Paquete Social
                                        </Typography>
                                    </Box>
                                    <Box mt={2} p={2} className={estilo.fondoColor}> 
                                        <Typography  className={estilo.precio}>
                                            $2,000 / Mes
                                        </Typography>
                                    </Box>
                                    <Box mt={4} >
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography variant="h6" >
                                                <DoneIcon /> Manejo de una red social
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography  variant="h6" >
                                                <DoneIcon /> Cinco Post por semana
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography  variant="h6" >
                                                <DoneIcon /> Tres fotos de portada
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography  variant="h6" >
                                                <AddIcon style={{fontSize: 45}} /> 
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography  variant="h6" >
                                                <DoneIcon /> PAQUETE BASICO
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid lg={5} md={4} xs={11}>
                            <Box mt={2} />
                                <Card className={estilo.root}>
                                    <Box textAlign="center" mt={3} p={1} > 
                                        <Typography  variant="h4">
                                            Paquete Premium
                                        </Typography>
                                    </Box>
                                    <Box mt={2} p={2} className={estilo.fondoColor}>
                                        <Typography className={estilo.precio}>
                                           $500 / Mes
                                        </Typography>
                                    </Box>
                                    <Box mt={4} >
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography variant="h6" >
                                                <DoneIcon /> 3 Imágenes publicitarias (Banners)
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" justifyContent="center"  textAlign="center">
                                            <Typography variant="h6" >
                                                <DoneIcon /> Subir todos tus productos a tu pagina y actualizaciones
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography  variant="h6" >
                                                <AddIcon style={{fontSize: 45}} /> 
                                            </Typography>
                                        </Box>
                                        <Box p={1} display="flex" justifyContent="center" >
                                            <Typography  variant="h6" >
                                                <DoneIcon /> PAQUETE BASICO
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                </Grid>
            </Container>
    )
}
