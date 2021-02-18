import React, { Fragment } from 'react'
import { makeStyles, Grid, Box} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'
import imagen from '../img/BannerLogo.PNG'

// import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    bannerOne:{
        backgroundColor: '#08f',
        width: '100%',
		height: 650
    },
    bannerTwo:{
        backgroundColor: '#fff',
        width: '100%',
		height: 650
    },
    imagen: {
        width: '85%',
        height: 650
    },
    tipografia:{
        color: '#fff',
        fontSize: 120,
    },
    tipografiaTwo:{
        color: '#08f',
        fontSize: 55,
    },
    buttonOne:{
        width: 'auto',
        backgroundColor: 'white',
        color: '#08f',
        fontSize: 25
    },
    buttonTwo:{
        width: 'auto',
        backgroundColor: '#08f',
        color: 'white',
        fontSize: 25
    },
    
}))


export default function Banner() {
    const classes = useStyles();

    return (
        <Fragment>
            <Grid>
            <Carousel interval={4000} indicators={false} >
                <Box display="flex" >
                    <img alt="No imagen" src={imagen}/>
                </Box>

                <Box display="flex">
                    <img alt="No imagen" src={imagen}/>
                </Box>
                
            </Carousel>
            </Grid>
        </Fragment>
    )
}
