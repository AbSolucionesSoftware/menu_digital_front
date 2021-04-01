import { Box, Button, Grid, IconButton, makeStyles, TextField, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import comody from '../../img/Comody.jpeg';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
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
  }));



export default function Reservaciones(props) {

    const {slug} = props;
    const classes = useStyles();
    const [cliente, setCliente] = useState([]);
    const [empresa, setEmpresa]  = useState([]);
    const [validate, setValidate] = useState(true);

    console.log(slug);

    const consultarDatos = async () => {
		await clienteAxios
			.get(`/company/slug/company/${slug}`)
			.then((res) => {
				if (res.data === null) {
					return 
				}else{
					setEmpresa(res.data);
				}
			})
			.catch((err) => {
			})
	}

    useEffect(() => {
        consultarDatos();
    }, []);

    const reservacion = JSON.parse(localStorage.getItem('reservacion'));

    const obtenerCampos = (e) => {
        setValidate(true);
		setCliente({
			...cliente,
			[e.target.name]: e.target.value
		});
        
        localStorage.setItem('reservacion', JSON.stringify({...reservacion, [e.target.name]: e.target.value}))
	};

    const mensaje = ` Hola, me comunico desde *COMODY*, me gustaria solicitar disponibilidad para una reservación, el diay hora:%0A ${!reservacion? "" : reservacion.fechaHora}hrs.%0APara ${!reservacion? "" : reservacion.personas} personas%0AA nombre de: ${!reservacion? "" : reservacion.nombre}`
    
    if (empresa === null) {
        return null;
    }else{
        if (empresa.public === true) {
        return (
            <div>
                <Grid lg={12}>
                    <Grid>
                        <Box mt={2} p={1} textAlign="center">
                            <Typography variant="h6">
                                Realiza una reservación para nuestro restaurante
                            </Typography>
                        </Box>
                        <Box p={1} textAlign="center">
                            <Typography  variant="body1">
                                Completa los campos para poder llenar tu solicitud.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid lg={12} xs={12}>
                        <Box display="flex" justifyContent="center" flexWrap="wrap">
                            <Box p={2}>
                                <TextField
                                    defaultValue={reservacion ? reservacion.nombre : ''}
                                    id="Nombre"
                                    label="Nombre"
                                    placeholder="Nombre"
                                    name="nombre"
                                    multiline
                                    variant="outlined"
                                    onChange={obtenerCampos}
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={reservacion ? reservacion.personas : ''}
                                    id="personas"
                                    label="No. de Personas"
                                    placeholder="No. de Personas"
                                    name="personas"
                                    multiline
                                    variant="outlined"
                                    onChange={obtenerCampos}
                                />
                            </Box>
                            <Box p={2}>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="fechaHora"
                                        label="Hora y Fecha prevista"
                                        type="datetime-local"
                                        name="fechaHora"
                                        defaultValue={reservacion ? reservacion.fechaHora : ''}
                                        onChange={obtenerCampos}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                            </Box>
                        </Box>
                        <Box p={2} display="flex" justifyContent="center" alignContent="center">
                            {!reservacion || !reservacion.nombre || !reservacion.personas || !reservacion.fechaHora ? (
                                <Button
                                disabled={true}
                                className={classes.buton}
                                variant="contained" 
                                color="primary"
                                size="large"
                                >
                                    Solicitar Disponibilidad
                                </Button>
                            ): (
                                <a style={{textDecoration: "none" }} target="_blank" href={`https://api.whatsapp.com/send?phone=52${empresa.phone}&text=${mensaje}`}>
                                    <Button
                                        className={classes.buton}
                                        variant="contained" 
                                        color="primary"
                                        size="large"
                                        onClick={() => 
                                            localStorage.removeItem("reservacion")
                                        }
                                    >
                                        Solicitar Disponibilidad
                                    </Button>
                                </a>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </div>
        )
        }else{
			return(
                <Grid lg={12}>
                    <Grid>
                        <Box p={3} textAlign="center">
                            <Typography variant="h6">
                               Lo sentimos esta pagina no esta disponible por el momento
                            </Typography>
                        </Box>
                        <Box mb={2} mt={1}>
                            <div className={classes.containerImage}>
                                <img className={classes.image} alt="logotipo" src={comody}/>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
			);
		}
    }
}
