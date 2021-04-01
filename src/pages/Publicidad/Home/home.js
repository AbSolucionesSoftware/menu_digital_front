import React, { useEffect } from 'react'

import BannerPrincipal from '../BannerPrincipal/bannerPrincipal'
import FrenteScroll from '../Scroll/scroll'
import Paquetes from '../Paquetes/paquetes';
import CarruselEmpresas from '../Empresas/empresas'
import Carrusel from '../Empresas/carruselEmpresas'

import { Box,Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    fondo:{
        // backgroundColor: "#bb2225"
    }
}))

export default function HomePublicidad() {

     const classes = useStyles();

    useEffect(() => {
        localStorage.removeItem('slug');
        localStorage.removeItem('idEmpresa');
    }, [])

     //  className={classes.fondo}
    return (
        <div >
            <BannerPrincipal/>
            {/* <Box p={5}>
                <Carrusel/>
            </Box> */}
            <Container>
                <FrenteScroll/>
            </Container>
            <Box mb={3}>
                <Paquetes/>
            </Box>
            {/* <CarruselEmpresas /> */}
        </div>
    )
}
