import { Box, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import React, { Fragment } from 'react'

import useStyles from '../estilos';

const stylesLocal = makeStyles((theme) => ({
    precio:{
        fontSize: 35,
        color: '#2222a8',
        textAlign: 'center'
    },
    tipografia:{
        fontSize: 17,
        textAlign:'center',
        marginTop: 12
    },
    fondo:{
        background: '#673de6',
    },
    fondoColor:{
        background: '#F8E9FF',
    },
    blanco:{
        fontSize: 35,
        textAlign:'center',
        color: "white"
    },
    fondo2:{
        background: '#F8E9FF',
        
    }
}))

export default function Paquetes() {

    const classes = useStyles();
    const estilo = stylesLocal();

    return (
        <Fragment>
            <Container>
                <Grid container spacing={1} >
                        <Grid lg={12} xs={11}>
                            <Typography component="div" variant="h4">
                                <Box textAlign="center" mt={5}>
                                    Affordable Packages
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
                        <Grid container>
                            <Grid lg={4} md={4} xs={11}>
                                <Box mt={7} className={estilo.fondoColor}>
                                    <Typography className={classes.tituloSec}>
                                        Personal
                                    </Typography>
                                </Box>
                                <Box mt={2}>
                                    <Typography  className={estilo.precio}>
                                        $50 
                                    </Typography>
                                </Box>
                                <Box mt={4} className={estilo.fondoColor}>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/> Unlimited Photos
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/> Secure Online Transfer
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>Unlimited Styles
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>Cloud Storage
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>24/7 Customer Service
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>Automatic Backup
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid lg={4} md={4} xs={11}>
                                <Box mt={7}>
                                    <Typography  className={classes.tituloSec}>
                                        Business
                                    </Typography>
                                </Box>
                                <Box mt={3} className={estilo.fondo}>
                                    <Typography className={estilo.blanco}>
                                        $75
                                    </Typography>
                                </Box>
                                <Box mt={3}>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/> Unlimited Photos
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/> Secure Online Transfer
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>Unlimited Styles
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>Cloud Storage
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>24/7 Customer Service
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>Automatic Backup
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid lg={4} md={4} xs={11}>
                                <Box mt={7} className={estilo.fondoColor}> 
                                    <Typography  className={classes.tituloSec}>
                                        Ultimate
                                    </Typography>
                                </Box>
                                <Box mt={3}>
                                    <Typography  className={estilo.precio}>
                                        $99 
                                    </Typography>
                                </Box>
                                <Box mt={3} mb={7} className={estilo.fondoColor} >
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/> Unlimited Photos
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/> Secure Online Transfer
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>Unlimited Styles
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>Cloud Storage
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>24/7 Customer Service
                                    </Typography>
                                    <Typography  vaiant="body1" className={estilo.tipografia}>
                                        <DoneIcon className={classes.colorIcon}/>Automatic Backup
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}
