import { Box, Button, Container, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import React, {  useState } from 'react';
import useStyles from '../estilos';
import ImagenFondo from '../../image/foto.jpg'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './contacto.scss'
// import { StayPrimaryLandscape } from '@material-ui/icons';
// import { blue } from '@material-ui/core/colors';

const stylesLocal = makeStyles((theme) => ({
    
    containerImagen:{
        backgroundImage: `url(${ImagenFondo})`,
        backgroundAttachment: 'fixed',
    },
    textF: {
        width: "130%", 
        background: "white",
        borderRadius: 5,
    },
    textLarge: {
        width: "50%", 
        background: "white",
        borderRadius: 5,
    },
    tipo:{
        color:"white",
        fontSize: 45,
    },
    boton: {
        height: 56
    },
    botonCorreo:{
        borderRadius: 100,
        fontSize: 75,
    }
   
}))



export default function Contacto() {

    const [ open, setOpen ] = useState(true);
    
    // const classes = useStyles();
    const estilo = stylesLocal();

    return (
        <div >
            <div className="fondoImagen">
                <Container>
                    <Grid lg={12} xs={12}>
                        <Box pb={1}>
                            <Box p={1}>
                                <Typography className={estilo.tipo} component="div" >
                                    <Box textAlign="center" mt={10}>
                                        Download the app on
                                    </Box>
                                </Typography>
                            </Box>
                                <Box display="flex" justifyContent="center"  p={5}>
                                    <Box pr={3}>
                                        <Button
                                            variant="contained" 
                                            color="primary"
                                            size="large"
                                            className={estilo.boton}
                                            disableRipple
                                            startIcon={<AppleIcon />}
                                        >
                                            App Store
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            size="large"
                                            className={estilo.boton}
                                            disableRipple
                                            startIcon={<AndroidIcon />}
                                        >
                                            Play Store
                                        </Button>
                                    </Box>
                                </Box>
                            <Box>
                                <Typography  className={estilo.tipo}  component="div" >
                                    <Box textAlign="center" mt={10}>
                                        Subscribe Now!
                                    </Box>
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="center" flexWrap="wrap" p={5}>
                                <Box mr={2} mt={3}>
                                    <TextField 
                                        className={estilo.textF} 
                                        id="outlined-basic" 
                                        label="Your mail" 
                                        variant="outlined" 
                                    />
                                </Box>
                                <Box ml={7} mt={3}>
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        size="large"
                                        className={estilo.boton}
                                        disableRipple
                                    >
                                        Suscribirse
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Container>
            </div>
            <div >
                <Container>
                    <Box textAlign="center">
                        <IconButton 
                            variant="outlined"
                            color="primary"
                            size="large"
                            className={estilo.botonCorreo}
                            disableRipple
                            onClick={() => open === false ? (
                                setOpen(true)
                            ):(
                                setOpen(false)
                            ) }
                        >
                            <MailOutlineIcon className={estilo.botonCorreo}/>
                        </IconButton>
                    </Box>
                    <Box>
                        {open === true ? (
                            <Box textAlign="center">
                               <form>
                                    <Box display="flex" justifyContent="center" p={1}>
                                        <TextField 
                                            className={estilo.textLarge} 
                                            id="outlined-basic" 
                                            label="Your name" 
                                            variant="outlined" 
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="center" p={1}>
                                        <TextField 
                                            className={estilo.textLarge} 
                                            id="outlined-basic" 
                                            label="Your mail" 
                                            variant="outlined" 
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="center" p={1}>
                                        <TextField
                                            className={estilo.textLarge} 
                                            id="outlined-basic"
                                            label="Subject"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="center" p={1}>
                                        <TextField
                                            className={estilo.textLarge}
                                            id="outlined-basic"
                                            label="Message"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box mt={3}>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            size="large"
                                            className={estilo.boton}
                                            disableRipple
                                        >
                                            Send Message
                                        </Button>
                                    </Box>
                               </form>
                            </Box>
                        ): (
                            null
                        )}
                    </Box>
                </Container>
            </div>
        </div>
    )
}
