import React, { useEffect } from 'react';
import { Box, Button,makeStyles, Grid, Typography, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom';
import Comody from '../../../img/Comody.jpeg'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    image: {
		maxHeight: '100%',
		maxWidth: '100%'
	},
	containerImage:{
		width: 180,
		height: 90
	}
}));



export default function Bienvenida() {

    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        
            <Grid container justify="center">
                <Grid item lg={5} style={{height: '100%'}} >
                    <Paper elevation={3} style={{height: '100%', marginTop: 15}}>
                        <Box display="flex" justifyContent="center" alignContent="center" alignItems="center">
                            <Box textAlign='center' p={1} className={classes.containerImage}>  
                                <img className={classes.image} alt="logotipo" src={Comody} />
                            </Box>
                        </Box>
                        <Box textAlign="center" p={1}>
                            <Typography variant='h5'>
                                Bienvenido a la Familia de COMODY
                            </Typography>
                        </Box>
                        <Box textAlign="center" p={1}>
                            <Typography variant='h6'>
                                Ahora formas parte COMODY, una empresa que revoluciona la nueva era de los Menus Digitales
                            </Typography>
                        </Box>
                        <Box textAlign="center" p={1}>
                            <Typography variant='h6'>
                                Guarda muy bien tu usuario con el que te registraste, este sera tu forma de ingresar a la plataforma
                                en conjunto de tu contraseña.
                            </Typography>
                        </Box>
                        <Box textAlign="center" p={1}>
                            <Typography variant='h6'>
                                En caso de tener problemas al iniciar sesion, con tu usuario o contraseña, te invitamos a contactarnos
                                al correo de soporte: contacto@comody.mx
                            </Typography>
                        </Box>
                        <Box textAlign="center" p={1}>
                            <Typography variant='h6'>
                                Una vez iniciado sesion podras continuar con el llenado de los datos de tu empresa dentro de tu propia cuenta.
                            </Typography>
                        </Box>
                        <Box textAlign="center" p={3}>
                            <Button
                                color="primary"
                                size="large"
                                variant="contained"
                                component={Link} 
                                to={`/login`}
                                startIcon={ <AccountCircleIcon /> }
                            >
                                Iniciar sesion
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

    )
}
