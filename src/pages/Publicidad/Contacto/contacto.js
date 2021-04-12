import { Box, Button, Container, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import clienteAxios from '../../../config/axios'
import MessageSnackbar from '../../../components/Snackbar/snackbar'
import React, {  useState } from 'react';
import useStyles from '../estilos';
// import ImagenFondo from '../../image/foto.jpg'
import MailOutlineIcon from '@material-ui/icons/MailOutline';

// import { StayPrimaryLandscape } from '@material-ui/icons';
// import { blue } from '@material-ui/core/colors';

const stylesLocal = makeStyles((theme) => ({
    
    containerImagen:{
        // backgroundImage: `url(${ImagenFondo})`,
        backgroundAttachment: 'fixed',
    },
    textF: {
        width: "130%", 
        background: "white",
        borderRadius: 5,
    },
    textLarge: {
        width: "60%", 
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
    const [ validate, setValidate ] = useState(false);
    const [ correo, setCorreo ] = useState([]);
    
    const classes = useStyles();
    const estilo = stylesLocal();

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const enviarCorreo = async () => {
        if (!correo.nombre || !correo.asunto
            || !correo.mensaje || !correo.correo ) {
			setValidate(true);
			return;
		}
        try {
            await clienteAxios
            .post(`/company/contact/send/email/`, {
                "pagina": "comody",
                "mensaje": correo.mensaje,
                "nombre": correo.nombre,
                "telefono": correo.telefono,
                "asunto": correo.asunto,
                "correo": correo.correo
            })
            .then((res) => {
                console.log(res);
                setSnackbar({
                    open: true,
                    mensaje: "Correo enviado exitosmente, pronto nos contataremos contigo.",
                    status: 'success'
                });
            })
            .catch((err) => {
                console.log(err);
                setSnackbar({
                    open: true,
                    mensaje: "Ocurrio un problema con el servidor",
                    status: 'err'
                });
            });
        } catch (error) {
            console.log(error);  
        }
    }

    const handleCorreo = (e) =>{
        setCorreo({
			...correo,
			[e.target.name]: e.target.value
		});
    }

    return (
        <div >
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            {/* <div className="fondoImagen">
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
            </div> */}
             <div>
                <Container>
                    <Box mt={6} textAlign="center">
                        <Typography variant="h3" color="primary">
                            Contactanos
                        </Typography>
                    </Box>
                    <Box p={1} textAlign="center">
                        <Typography variant="h5">
                            Completa con tus datos este formulario y enseguida nos contactaremos contigo para darte mayor información
                        </Typography>
                    </Box>
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
                                            error={!correo.nombre && validate}
                                            helperText={!correo.nombre && validate ? 'Esta campo es requerido' : null}
                                            value={correo.nombre ? correo.nombre : ''}
                                            className={estilo.textLarge} 
                                            name="nombre"
                                            placeholder="Interesado"
                                            label="Nombre de Interesado" 
                                            variant="outlined"
                                            onChange={handleCorreo}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="center" p={1}>
                                        <TextField 
                                            error={!correo.correo && validate}
                                            helperText={!correo.correo && validate ? 'Esta campo es requerido' : null}
								            value={correo.correo ? correo.correo : ''}
                                            className={estilo.textLarge} 
                                            name="correo"
                                            placeholder="Tu correo electronico"
                                            label="Cuenta de Correo" 
                                            variant="outlined" 
                                            onChange={handleCorreo}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="center" p={1}>
                                        <TextField
                                            error={!correo.asunto && validate}
                                            helperText={!correo.asunto && validate ? 'Esta campo es requerido' : null}
                                            value={correo.asunto ? correo.asunto : ''}
                                            className={estilo.textLarge} 
                                            name="asunto"
                                            placeholder="Asunto de este correo"
                                            label="Asunto"
                                            variant="outlined"
                                            onChange={handleCorreo}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="center" p={1}>
                                        <TextField 
                                            className={estilo.textLarge}
                                            value={correo.telefono ? correo.telefono : ''}
                                            name="telefono"
                                            placeholder="Telefono opcional"
                                            label="Telefono" 
                                            variant="outlined" 
                                            onChange={handleCorreo}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="center" p={1}>
                                        <TextField
                                            error={!correo.mensaje && validate}
                                            helperText={!correo.mensaje && validate ? 'Esta campo es requerido' : null}
                                            value={correo.mensaje ? correo.mensaje : ''}
                                            className={estilo.textLarge}
                                            name="mensaje"
                                            placeholder="Mensaje de correo"
                                            label="Mensaje"
                                            multiline
                                            variant="outlined"
                                            onChange={handleCorreo}
                                        />
                                    </Box>
                                    <Box p={3}>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            size="large"
                                            className={estilo.boton}
                                            onClick={() => enviarCorreo()}
                                        >
                                            Enviar Correo
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
