import React, { useEffect } from 'react'

import BannerPrincipal from '../BannerPrincipal/bannerPrincipal'
import FrenteScroll from '../Scroll/scroll'
import Paquetes from '../Paquetes/paquetes';
import Contacto from '../Contacto/contacto'
// import CarruselEmpresas from '../Empresas/empresas'
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
            <Box p={5}>
                <Carrusel/>
            </Box>
            <Container>
            <div id="informacion">
                <FrenteScroll/>
            </div>
            </Container>
            {/* <Box mb={3}>
                <div id="paquetes">
                    <Paquetes />
                </div>
            </Box> */}
            {/* <div id="contacto">
                <Contacto />
            </div> */}
            {/* <CarruselEmpresas /> */}
        </div>
    )
}
