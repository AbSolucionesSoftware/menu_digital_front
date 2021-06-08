import ReactDOM from 'react-dom';
import { Box, Grid,  Hidden,  IconButton,  makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import clienteAxios from '../../../config/axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from 'react-router-dom';
import ItemsCarousel from 'react-items-carousel';
import { MenuContext } from '../../../context/menuContext';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import './empresas.scss'

// import InfiniteCarousel from 'react-leaf-carousel';
// import { ScrollingCarousel  } from '@trendyol-js/react-carousel';


const stylesLocal = makeStyles((theme) => ({
  containerImagen:{
      height: 300,
      width: 280,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      // background: "white",
      borderRadius: 6
  },
  containerImagenResponsive:{
    height: 160,
    width: 140,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // background: "white",
    borderRadius: 6
  },
  imagen:{
      maxWidth: "100%",
      maxHeight: "100%",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      borderRadius: 6
  }
}))


export default function Carrusel() {
  
	  const { recargar, setRecargar } = useContext(MenuContext);

    const [ empresas, setEmpresas ] = useState([]);
    const classes = stylesLocal();

    const consultarDatos = async () => {
      await clienteAxios
        .get('/company/fullCompanys/')
        .then((res) => {
          setEmpresas(res.data);
        })
        .catch((err) => {
        })
    }

    useEffect(() => {
      consultarDatos();
    }, [])

	  const render = empresas.map((empresa) => {
      if (empresa.type === true || !empresa.logoImagenUrl || empresa.test === true) {
        return null;
      }else{
        return(
          <>
          <Hidden xsDown>
            <Box p={2} key={empresa._id} className={classes.containerImagen} onClick={ () => setRecargar(!recargar)}>
              <Link to={`/${empresa.slug}`}>
                {
                  localStorage.removeItem("carritoUsuario"),
                  localStorage.removeItem('usuario')
                }
                <img
                  className={classes.imagen}
                  alt='No imagen'
                  src={empresa.logoImagenUrl}
                />
              </Link>
            </Box>
          </Hidden>
          <Hidden smUp>
            <Box p={1} key={empresa._id} className={classes.containerImagenResponsive} onClick={ () => setRecargar(!recargar)}>
              <Link to={`/${empresa.slug}`}>
                {
                  localStorage.removeItem("carritoUsuario"),
                  localStorage.removeItem('usuario')
                }
                <img
                  className={classes.imagen}
                  alt='No imagen'
                  src={empresa.logoImagenUrl}
                />
              </Link>
            </Box>
          </Hidden>
          </>
          
        )
      }
    })

    return (
      <>
        <Grid item lg={12} xs={12}>
          <Box mt={2} textAlign="center" >
            <Typography color="primary" style={{fontSize: 35, fontWeight: 600}}>
              Empresas afiliadas a Comody
            </Typography>
          </Box>
        </Grid>

        <Grid container justify="center">
            {render}
        </Grid>
        

        {/* <Grid item lg={12} xs={12}>
          <Hidden xsDown>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={4}
              gutter={40}
              leftChevron={
                <IconButton aria-label="delete" disabled color="primary">
                  <ArrowBackIosIcon />
                </IconButton>
              }
              rightChevron={
                <IconButton aria-label="delete" disabled color="primary">
                  <ArrowForwardIosIcon />
                </IconButton>
              }
              outsideChevron
              infiniteLoop={true}
              chevronWidth={chevronWidth}
            >
              {render}
            </ItemsCarousel>
          </Hidden>
          <Hidden smUp>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={1}
              gutter={40}
              leftChevron={
                <IconButton aria-label="delete" disabled color="primary">
                  <ArrowBackIosIcon />
                </IconButton>
              }
              rightChevron={
                <IconButton aria-label="delete" disabled color="primary">
                  <ArrowForwardIosIcon />
                </IconButton>
              }
              outsideChevron
              infiniteLoop={true}
              chevronWidth={chevronWidth}
            >
              {render}
            </ItemsCarousel>
          </Hidden>
        </Grid> */}
      </>
  )
} 