import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import imagen1 from '../../image/screen.jpg'
import imagen2 from '../../image/screen 2.jpg'
import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import useStyles from '../estilos';

const stylesLocal = makeStyles((theme) => ({
    
    containerImagen:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 480,
        width: 290,
        background: "white",
        borderRadius: 6
    },
    imagen:{
        maxWidth: "95%",
        maxHeight: "95%",
        borderRadius: 6
    }
   
}));

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 1
    }
};


export default function Carrusel_Screens() {
    const classes = useStyles();
    const estilos = stylesLocal();

    return (
    <div>
        <Grid xs={12}>
            <Typography component="div" variant="h4">
                <Box textAlign="center" mt={8}>
                    Screenshots
                </Box>
            </Typography>
            <Box textAlign="center" mt={1}> 
                <Divider className={classes.divisorPrincipal}/>
            </Box>
            <Typography component="div" variant="body1">
                <Box textAlign="center" mt={3}>
                    List your app features and all the details Lorem ipsum dolor kadr
                </Box>
            </Typography>
            <Box textAlign="center" mt={1}> 
                <Divider className={classes.divisorPrincipal}/>
            </Box>
        </Grid>

        <Grid lg={12} xs={ 12}>
            <Box mt={5} mb={5} >
                <Carousel 
                    responsive={responsive} 
                    showDots
                    sliderClass=""
                    swipeable
                    // autoPlay
                    // autoPlaySpeed={3000}
                    // containerClass="container"
                >
                    <Box className={estilos.containerImagen}>
                        <img
                            className={estilos.imagen}
                            src={imagen2}
                            alt="imagen"
                        />
                        
                    </Box>
                    <Box className={estilos.containerImagen}>
                        <img
                            alt="imagen"
                            className={estilos.imagen}
                            src={imagen1}
                        />
                        
                    </Box>
                    <Box className={estilos.containerImagen}>
                        <img
                            className={estilos.imagen}
                            src={imagen2}
                            alt="imagen"
                        />
                        
                    </Box>
                    <Box className={estilos.containerImagen}>
                        <img
                            className={estilos.imagen}
                            src={imagen1}
                            alt="imagen"
                        />
                        
                    </Box>
                    <Box className={estilos.containerImagen}>
                        <img
                            className={estilos.imagen}
                            src={imagen2}
                            alt="imagen"
                        />
                        
                    </Box>
                    <Box className={estilos.containerImagen}>
                        <img
                            className={estilos.imagen}
                            src={imagen1}
                            alt="imagen"
                        />
                        
                    </Box>
                    <Box className={estilos.containerImagen}>
                        <img
                            className={estilos.imagen}
                            src={imagen2}
                            alt="imagen"
                        />
                        
                    </Box>
                    <Box className={estilos.containerImagen}>
                        <img
                            className={estilos.imagen}
                            src={imagen1}
                            alt="imagen"
                        />
                        
                    </Box>
                </Carousel>
            </Box>
        </Grid>

    </div>

    )
}
