import ReactDOM from 'react-dom';
import { Box, Grid,  makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

// import InfiniteCarousel from 'react-leaf-carousel';
import clienteAxios from '../../../config/axios';

const stylesLocal = makeStyles((theme) => ({
  containerImagen:{
      height: 300,
      width: 250,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      // background: "white",
      borderRadius: 6
  },
  imagen:{
      marginLeft: 80,
      maxWidth: "100%",
      maxHeight: "100%",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      borderRadius: 6
  }
}))

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 400, min: 0 },
    items: 1,
  },
};


export default function Carrusel() {

    const [ empresas, setEmpresas ] = useState([]);
    const classes = stylesLocal();

    const consultarDatos = async () => {
      await clienteAxios
        .get('/company/fullCompanys/')
        .then((res) => {
          console.log(res);
          setEmpresas(res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
        })
    }

    useEffect(() => {
      consultarDatos();
    }, [])

	  const render = empresas.map((empresa) => {
      if (empresa.type === true) {
        return null;
      }else{
        return( 
          <Box className={classes.containerImagen}>
            <Link to={`/${empresa.slug}`}>
              <img
                className={classes.imagen}
                alt='No imagen'
                src={empresa.logoImagenUrl}
              />
            </Link>
          </Box>
           
        )
      }
    })

    return (
      <Grid container>
        <Grid lg={12} xs={12}>
          <Box mt={2} textAlign="center" >
            <Typography color="primary" style={{fontSize: 35, fontWeight: 600}}>
              Empresas Afiliadas con Comody
            </Typography>
          </Box>
        </Grid>
        <Grid lg={12} xs={12}>
            <Carousel
              responsive={responsive}  
              // showDots
              sliderClass=""
              swipeable
              infinite
              autoPlay
              autoPlaySpeed={1800}
              containerClass="container"
            >
              {render}
            </Carousel>
        </Grid>
      </Grid>
  )
} 