import { Box, Container, Divider, Grid, Hidden, Typography } from '@material-ui/core';
import React, { Fragment } from 'react'

import ImagenOne from '../../../image/CelularOne.png'
import useStyles from '../../estilos';


export default function Primera() {

    const classes = useStyles();

    return (
        <Fragment>
            <Container>
                <Grid container spacing={1} >
                    <Grid lg={6} xs={11}>
                        <Typography component="div" variant="h4">
                            <Box textAlign="left" mt={9}>
                                CAFI tu tienda en línea, en una APP MOVIL 
                            </Box>
                        </Typography>
                        <Box className={classes.margenes}>

                            <Divider variant="inset" className={classes.divisor}/>
                        
                        </Box>
                        <Typography component="div" className={classes.tipografia}>
                            <Box  className={classes.margenes}>
                                Al adquirir nuestros servicios tendras la posibilidad de poder obtener tu propia App Movil.
                            </Box>
                            <Box  className={classes.margenes}>
                                Una mayor experiencia para tus usuarios. Podran encontrarte mas rapido desde la PlayStore, para poder consultar mas rapido tus productos
                            </Box>
                            <Box  className={classes.margenes}>
                                Mismos productos, misma publicidad, mismas promociones, todo desde tu propia aplicación. Estar a la vanguardia del mercado digital nunca fue tan facil.
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid lg={6} xs={11} >
                        <Box ml={7} className={classes.containerImage}>
                            <img 
                                className={classes.imagen}
                                src={ImagenOne}
                                alt="Tecnologia de Huawei" 
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}
