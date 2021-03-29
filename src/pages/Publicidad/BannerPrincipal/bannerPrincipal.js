import React from 'react'
import { Box, Grid, makeStyles } from '@material-ui/core'
import { Fragment } from 'react'
// import GetAppIcon from '@material-ui/icons/GetApp';

import banner from '../../image/BannerLogo.PNG';

const useStyles = makeStyles((theme) => ({
    principal:{
        position: 'relative'
    },
    imagen:{
        width: '100%',
        height: '100%'
    },
    containerImagen:{
        width: '100%',
        // height: '95%',
        position: 'relative',
        zIndex: 80
    },
    containerBotton:{
        marginLeft: '15%',
        position: 'absolute',
        top: '75%',
        zIndex: 100,
    },
    buton:{
        fontSize: 22,
        textTransform: 'none',
    }
    //8600c8
    
}));

export default function BannerPrincipal() {

    const classes =useStyles();
    
    return (
        <Fragment>
            <Grid className={classes.principal}>
                <Box className={classes.containerImagen}>
                    <img className={classes.imagen}
                        src={banner} 
                        alt="Banner principal publicitario" 
                    />
                </Box>
                {/* <Box className={classes.containerBotton}>
                    <Button variant="contained" color="secondary" className={classes.buton}>
                        <GetAppIcon fontSize='large'/>
                        Download App
                    </Button>
                </Box> */}
            </Grid>
        </Fragment>
        
    )
}
