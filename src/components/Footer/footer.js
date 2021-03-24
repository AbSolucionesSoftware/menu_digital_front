import { Box, Grid, Hidden, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

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

export default function Footer() {

	const classes = useStyles();
    return (
        <div>
            <Grid container className={classes.fondo}>
                <Grid lg={4} xs={12}>
                    <Box p={1} textAlign="center">
                        <Typography variant="body1">
                            ¿Te interesa formar parte de Comody?
                        </Typography>
                        <Typography variant="body1">
                            Contactanos:
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Box mr={2}>
                            <PhoneForwardedIcon style={{fontSize: 35}}/>
                        </Box>
                        <Typography variant="body1">
                           3173873462
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" alignItems="center">
                        {/* <Box mr={2}>
                            <MailOutlineIcon style={{fontSize: 35}}/>
                        </Box>
                        <Typography variant="body1">
                            correo.correo@gmail.com
                        </Typography> */}
                    </Box>
                </Grid>
                <Hidden xsDown>
                    <Grid item sm={4}>
                        <div className={classes.containerImage}>
                            <img className={classes.image} alt="logotipo" src={comody}/>
                        </div>
                    </Grid>
                </Hidden>
                <Grid lg={4} xs={12} >
                    <Box p={1} textAlign="center">
                        <Typography variant="body1">
                            ¡Encuentranos y Siguenos!
                        </Typography>
                        <Box display="flex" justifyContent="center">
                            {/* <Box p={1} >
                                <FacebookIcon style={{fontSize: 35}}/>
                            </Box>
                            <Box p={1}>
                                <InstagramIcon style={{fontSize: 35}} />
                            </Box> */}
                        </Box>
                        
                        <Box p={1} display="flex" justifyContent="center" alignItems="center" >
                            {/* <LanguageIcon  mr={2} style={{fontSize: 35}}/>
                            <Typography variant="h6">
                                WWW.COMODY.MX
                            </Typography> */}
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

            
        </div>
    )
}
;