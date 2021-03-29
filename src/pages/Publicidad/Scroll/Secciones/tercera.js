import { Box, Container, Divider, Grid, Hidden, Typography } from '@material-ui/core';
import React, { Fragment } from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll';

import ImagenOne from '../../../image/CelularOne.png'
import useStyles from '../../estilos';


export default function Tercera() {

    const classes = useStyles();

    return (
        <Fragment>
            <Container>
                <Grid container spacing={1} >
                    <Grid lg={6} xs={12} >
                        <Box className={classes.containerImage}>
                            <img 
                                className={classes.imagen}
                                src={ImagenOne}
                                alt="Tecnologia de Huawei" 
                            />
                        </Box>
                    </Grid>
                    <Grid lg={6} xs={11}>
                        <Typography component="div" variant="h4">
                            <Box textAlign="left" mt={9}>
                                ¡Todo lo que obtienes con CAFI!
                            </Box>
                        </Typography>
                        <Box className={classes.margenes}>
                        
                        <Divider variant="inset" className={classes.divisor}/>
                        
                        </Box>
                        <Typography component="div" variant="body1" className={classes.tipografia}>
                            <Box className={classes.margenes}>
                                Tú, como dueño de tu tienda en línea tendrás acceso a un panel de administrador donde estarán todos los apartados y secciones de tu tienda 100% editables para que le des el diseño y estructura que siempre habías soñado.
                            </Box>
                            <Box display="flex" alignItems="center" className={classes.margenes}>
                                <Box p={1}>
                                    <DoneAllIcon className={classes.colorIcon} />
                                </Box>
                                <Box>
                                    Editar la información de tu tienda
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" className={classes.margenes}>
                                <Box p={1}>
                                    <DoneAllIcon className={classes.colorIcon} />
                                </Box>
                                <Box>
                                    Configurar cuales serán tus políticas de envió, políticas de privacidad y de imagen corporativa
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" className={classes.margenes}>
                                <Box p={1}>
                                    <DoneAllIcon className={classes.colorIcon} />
                                </Box>
                                <Box>
                                    Un apartado exclusivo donde puedes subir una historia de tu empresa.
                                </Box> 
                            </Box>
                            <Box display="flex" alignItems="center" className={classes.margenes}>
                                <Box p={1}>
                                    <DoneAllIcon className={classes.colorIcon} />
                                </Box>
                                <Box>
                                    Podras editar el logo de tu negocio, datos principales de contacto, ubicación
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" className={classes.margenes}>
                                <Box p={1}>
                                    <DoneAllIcon className={classes.colorIcon} />
                                </Box>
                                <Box>
                                    Tienes un apartado de publicidad donde en este apartado puedes subir una sección completa con un banner y los productos de una categoría en especial en la página principal.
                                </Box>
                            </Box>
                        </Typography>

                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}
