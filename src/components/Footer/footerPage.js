import { Box, Grid, Hidden, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import comody from '../../img/Comody.jpeg';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles((theme) => ({
    image: {
        maxHeight: '100%',
        maxWidth: '100%'
    },
    containerImage:{
        height: 90,
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(3)
    },
    fondo:{
        background: "#160404",
        color: "white"
    }
    }));
    
export default function FooterPage() {

	const classes = useStyles();

            return(
            <Grid container className={classes.fondo}>
                <Grid lg={4} xs={12}>
                    <Box mt={2} p={1} textAlign="center">
                        <Typography variant="body1">
                            Te interesa tener tu propio MENÚ DIGITAL
                        </Typography>
                        <Typography variant="body1">
                            Contactanos
                        </Typography>
                    </Box>
                    <Box  display="flex" justifyContent="center" alignItems="center">
                        <Box mr={2}>
                            <PhoneForwardedIcon style={{fontSize: 35}}/>
                        </Box>
                        <Typography variant="h5">
                            +52 317-103-5768
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" alignItems="center">
                        <Box mr={2}>
                            <MailOutlineIcon style={{fontSize: 35}}/>
                        </Box>
                        <Typography variant="body1">
                            contacto@comody.mx
                        </Typography>
                    </Box>
                </Grid>
                <Hidden xsDown>
                    <Grid item sm={4}>
                        <Box mb={2} mt={2}>
                            <div className={classes.containerImage}>
                                <img className={classes.image} alt="logotipo" src={comody}/>
                            </div>
                        </Box>
                    </Grid>
                </Hidden>
                <Grid lg={4} xs={12} >
                    <Box p={1} textAlign="center">
                        <Typography variant="body1">
                            ¡Encuéntranos y Siguenos!
                        </Typography>
                        <Box display="flex" justifyContent="center">
                            <Box p={1} >
                                <a target="_blank" href="https://www.facebook.com/Comody-tu-men%C3%BA-digital-101302482046695">
                                <FacebookIcon style={{color: "white",fontSize: 50}}/>
                                </a>
                            </Box>
                            <Box p={1}>
                                <a target="_blank" href="https://www.instagram.com/comody_menudigital/">
                                    <InstagramIcon style={{color: "white",fontSize: 50}}/>
                                </a>
                            </Box> 
                        </Box>
                        
                        <Box p={1} display="flex" justifyContent="center" alignItems="center" >
                            <LanguageIcon  mr={2} style={{fontSize: 35}}/>
                            <Typography variant="h6">
                                WWW.COMODY.MX
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid  lg={12} xs={12}>
                    <Box textAlign="center">
                        <Typography variant="body1">
                            Todos los derechos reservados de COMODY, AB Soluciones Empresariales 2021
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
			);
}
