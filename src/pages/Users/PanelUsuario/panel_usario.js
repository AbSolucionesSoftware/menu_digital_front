import React, { useEffect, useState } from 'react'
import Editar_User from './editar_user'

import TextField from '@material-ui/core/TextField';
import { Box, Button, Drawer, Grid, makeStyles, Typography } from '@material-ui/core/'
import clienteAxios from '../../../config/axios';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import Spin from '../../../components/Spin/spin';
import Editar_empresa from './editar_empresa';

const useStyles = makeStyles((theme) => ({
    imagen: {
		maxHeight: '100%',
		maxWidth: '100%'
	},
	containerImage:{
		width: 300,
		height: 190
	}
}));

export default function PanelUser() {

	const classes = useStyles();

    const [ datosEmpresa, setDatosEmpresa] = useState([]);
	const [ loading, setLoading ] = useState(false);
    const [ upload, setUpload ] = useState(false);

	const token = localStorage.getItem('token');
    const company = JSON.parse(localStorage.getItem('user'))

    const traerDatos = async () => {
        setLoading(true);
        await clienteAxios
			.get(`/company/${company._id}`, {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                setUpload(true);
                setLoading(false);
                setDatosEmpresa(res.data)
			})
			.catch((err) => {
                setUpload(true);
                setLoading(false);
			});
    }

    useEffect(() => {
        traerDatos();
    }, [upload])

    const [ open, setOpen ] = useState(false);

    const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

    return (
        <div>
			<Spin loading={loading} />

            <Grid>
                <Grid item lg={12}>
                    <Box textAlign="center" display="flex" justifyContent="center" flexWrap="wrap">
                        <Box p={2}>
                            <Typography variant="h4">
                                Tu empresa en Comody
                            </Typography>
                        </Box>
                        
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Grid container justify="center" item lg={12}>
                        <Box display="flex" justifyContent="center" alignContent="center" >
                            <Box textAlign="center" className={classes.containerImage}>
                                <img alt="Imagen de Logo" className={classes.imagen} src={datosEmpresa.logoImagenUrl}/>
                            </Box>
                        </Box>
                    </Grid>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Box p={3}>
                            <TextField variant="outlined" label="Compañia" value={`${datosEmpresa.nameCompany}`}/>
                        </Box>
                        <Box p={3}>
                            <TextField variant="outlined" label="Propietario" value={`${datosEmpresa.owner}`}/>
                        </Box>
                        <Box p={3}>
                            <TextField variant="outlined" label="Identificador" value={`${datosEmpresa.slug}`}/>
                        </Box>
                        <Box p={3}>
                            <TextField variant="outlined" label="Costo de Envio" value={`$${datosEmpresa.priceEnvio}`}/>
                        </Box>
                        <Box p={3}>
                            <TextField variant="outlined" label="Telefono" value={`${datosEmpresa.phone}`}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Box p={1} textAlign="center">
                        <Typography variant="h6">
                            Ubicación
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        {
                            datosEmpresa.calleNumeroPrin ? (
                                <Box p={1}>
                                    <TextField variant="outlined" label="Calle y Numero" value={`${datosEmpresa.calleNumeroPrin}`}/>
                                </Box>
                            ):(null)
                        }
                        {
                            datosEmpresa.cpPrin ? (
                                <Box p={1}>
                                    <TextField variant="outlined" label="Codigo Postal" value={`${datosEmpresa.cpPrin}`}/>
                                </Box>
                            ):(null)
                        }
                        {
                            datosEmpresa.coloniaPrin ? (
                                <Box p={1}>
                                    <TextField variant="outlined" label="Colonia" value={`${ datosEmpresa.coloniaPrin}`}/>
                                </Box>
                            ):(null)
                        }
                        {
                            datosEmpresa.ciudadPrin ? (
                                <Box p={1}>
                                    <TextField variant="outlined" label="Ciudad" value={`${ datosEmpresa.ciudadPrin }`}/>
                                </Box>
                            ):(null)
                        }
                        {
                            datosEmpresa.estado ? (
                                <Box p={1}>
                                    <TextField variant="outlined" label="Estado" value={`${datosEmpresa.estado}`}/>
                                </Box>
                            ):(null)
                        }
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Box p={1}  mt={2} textAlign="center">
                        <Typography variant="h6">
                            Tus Redes Sociales
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        { datosEmpresa.redesSociales && datosEmpresa.redesSociales.facebook ? (
                            <Box p={1}>
                                <a target="_blank" href={datosEmpresa.redesSociales.facebook}>
                                    <FacebookIcon style={{color: "black",fontSize: 60}}/>
                                </a>
                            </Box>
                        ):(
                            null
                        )
                        }
                        { datosEmpresa.redesSociales && datosEmpresa.redesSociales.instagram ? (
                            <Box p={1}>
                                <a target="_blank" href={datosEmpresa.redesSociales.instagram}>
                                    <InstagramIcon style={{color: "black",fontSize: 60}}/>
                                </a>
                            </Box>
                        ):(
                            null
                        )
                        }
                        { datosEmpresa.redesSociales && datosEmpresa.redesSociales.twiter ? (
                            <Box p={1}>
                                <a target="_blank" href={datosEmpresa.redesSociales.twiter}>
                                    <TwitterIcon style={{color: "black",fontSize: 60}}/>
                                </a>
                            </Box>
                        ):(
                            null
                        )
                        }
                    </Box>
                </Grid>
                <Grid item lg={12}>
                    <Box display="flex" justifyContent="center" >
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={handleDrawerOpen}
                        >
                            Editar Datos
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Drawer
                // className={classes.drawer}
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <Editar_empresa 
                    handleDrawerClose={handleDrawerClose} 
                    setUpload={setUpload} 
                    datosEmpresa={datosEmpresa} 
                    setDatosEmpresa={setDatosEmpresa}
                    upload={upload}
                />
                {/* <Editar_User 
                    handleDrawerClose={handleDrawerClose} 
                    setUpload={setUpload} 
                    datosEmpresa={datosEmpresa} 
                    setDatosEmpresa={setDatosEmpresa}
                    upload={upload}
                /> */}
                {/* <Box display="flex" justifyContent="center" p={1}>
                    <Button
                        variant="contained" 
                        color="secondary"
                        onClick={handleDrawerClose}
                    >
                        Salir
                    </Button>
                </Box> */}
            </Drawer>
        </div>
    )
}
