import React, { Fragment } from 'react'
import { makeStyles, Grid, Box} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'
import imagen from '../img/BannerLogo.PNG'
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    containerImagen:{
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    }, 
    containerBanner:{
        height: 500,
        // width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    imagen:{
        maxWidth: "100%",
        maxHeight:  "100%"   
    }
    
}))


export default function Banner() {
    const classes = useStyles();

    return (
        <Fragment>
            <Grid>
                <Carousel interval={4000} indicators={false} >
                    <Grid className={classes.containerImagen}>
                        <Box className={classes.containerBanner} >
                            <img className={classes.imagen} alt="No imagen" src={imagen}/>
                        </Box>
                    </Grid>

                    <Grid className={classes.containerImagen}>
                        <Box className={classes.containerBanner} >
                            <img className={classes.imagen} alt="No imagen" src={imagen}/>
                        </Box>
                    </Grid>
                </Carousel>
            </Grid>
        </Fragment>
    )
}
