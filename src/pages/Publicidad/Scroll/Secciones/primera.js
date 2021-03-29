import { Box, Container, Divider, Grid, Typography } from '@material-ui/core';
import React, { Fragment } from 'react'
import { IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import ImagenOne from '../../../image/iphone.png'
import useStyles from '../../estilos';


export default function Primera() {

    const classes = useStyles();

    return (
        <Fragment>
            <Container>
            <Grid container spacing={1} >
                {/* SECCIONES DE TITULOS */}
                <Grid xs={12} >
                    <Typography  component="div" variant="h4" >
                        <Box textAlign="center" mt={1}>
                            Asombrosas funciones en un solo click
                        </Box>
                    </Typography>

                    <Box mt={2}>
                        <Divider className={classes.divisorPrincipal}/>
                    </Box>

                    <Typography component="div" variant="body1" className={classes.tipografia}>
                        <Box textAlign="center" mt={1}>
                            Una lista de maravillosas funciones para ti como Administrador.
                        </Box>
                    </Typography>

                    <Box mt={2} mb={5}>
                        <Divider className={classes.divisorPrincipal}/>
                    </Box>

                </Grid>
                {/* FIN SECCION DE TITULOS */}
            
                {/* INCIIO DE CONTENIDO PRINCIPAL */}
                    <Grid container >
                        <Grid container lg={4} xs={12}>
                            <Grid xs={10}>
                                <Box >
                                    <Typography component="div" variant="h4" >
                                        <Box textAlign="right" className={classes.subtitulos} mt={2}>
                                            Descargar base de datos
                                        </Box>
                                        <Box textAlign="right" className={classes.tipografia} mt={2}>
                                            Puedes descargar toda la base de datos de tus clientes esto para garantizar la experiencia de usuario y un excelente servicio postventa.
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid xs={2}>
                                <Box mt="50%">
                                    <IconButton>
                                        <AccountCircleIcon className={classes.iconBoton}/>
                                    </IconButton>
                                </Box>
                            </Grid>

                            <Grid xs={10}>
                                <Box >
                                    <Typography component="div" variant="h4" >
                                        <Box textAlign="right" className={classes.subtitulos} mt={2}>
                                            Subir productos mas rapido
                                        </Box>
                                        <Box textAlign="right" className={classes.tipografia} mt={2}>
                                            Solamente necesitas seleccionar una categoría, Registrar los datos de tu producto y complementar con una galería de fotos. 
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid xs={2}>
                                <Box mt="50%">
                                    <IconButton>
                                        <AccountCircleIcon className={classes.iconBoton}/>
                                    </IconButton>
                                </Box>
                            </Grid>

                            <Grid xs={10}>
                                <Box >
                                    <Typography component="div" variant="h4" >
                                        <Box textAlign="right" className={classes.subtitulos} mt={2}>
                                            Ineventarios ONLINE
                                        </Box>
                                        <Box textAlign="right" className={classes.tipografia} mt={2}>
                                            Ya no tendrás que hacer un conteo de tu mercancía a diario, Con CAFI tu tienda en línea puedes administrar tu inventario online y cargar toda la base de datos de inventarios que tengas. Además, con pocos clics podrás agregar o restar unidades a tu inventario.
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid xs={2}>
                                <Box mt="50%">
                                    <IconButton>
                                        <AccountCircleIcon className={classes.iconBoton}/>
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container lg={4} xs={12} >
                            <Box mb={5}>
                                <Box display="flex" justifyContent="center" ml={5} mt={5} className={classes.containerImgSec} >
                                    <img 
                                        className={classes.imagen}
                                        src={ImagenOne}
                                        alt="Celular" 
                                    />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid container lg={4} xs={12}>
                            <Grid xs={2}>
                                <Box mt="50%">
                                    <IconButton>
                                        <AccountCircleIcon className={classes.iconBoton}/>
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid xs={10}>
                                <Box ml={3}>
                                    <Typography component="div" variant="h4" >
                                        <Box textAlign="left" className={classes.subtitulos} mt={2}>
                                            Control de Apartados!
                                        </Box>
                                        <Box textAlign="left" className={classes.tipografia} mt={2}>
                                            Si, tendrás un panel en el cual podrás gestionar los pedidos de tus clientes a detalle, donde el cliente puede seleccionar si quiere envió a domicilio o lo recoge en sucursal. Adicional a esto puedes actualizar el estado del pedido de tu cliente.
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid xs={2}>
                                <Box mt="50%">
                                    <IconButton>
                                        <AccountCircleIcon className={classes.iconBoton}/>
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid xs={10}>
                                <Box ml={3}>
                                    <Typography component="div" variant="h4" >
                                        <Box textAlign="left" className={classes.subtitulos} mt={2}>
                                            ¡Administrar tus Pedidos!
                                        </Box>
                                        <Box textAlign="left" className={classes.tipografia} mt={2}>
                                            En este apartado puedes ver todos los pedidos de tus clientes, filtrar por estados, si ya están pagados o no y cambiar su estado. Toda la gestión de tu tienda a unos clics de distancia.
                                        </Box>
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid xs={2}>
                                <Box mt="50%">
                                    <IconButton>
                                        <AccountCircleIcon className={classes.iconBoton}/>
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid xs={10}>
                                <Box ml={3}>
                                    <Typography component="div" variant="h4" >
                                        <Box textAlign="left" className={classes.subtitulos} mt={2}>
                                            Podras generar tus propias promociones!
                                        </Box>
                                        <Box textAlign="left" className={classes.tipografia} mt={2}>
                                            Podras agregar ofertas especiales a tu producto y aparecer en la página principal, así es, con pocos clics puedes agregar descuentos a tus productos sin necesidad de un programador.                                           
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
