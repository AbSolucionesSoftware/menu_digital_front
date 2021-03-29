import { Box, Button, Grid, IconButton, makeStyles, TextField, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import clienteAxios from '../../config/axios';

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
  }));

export default function Reservaciones(props) {

    const {slug} = props;
    const classes = useStyles();
    const [cliente, setCliente] = useState([]);
    const [empresa, setEmpresa]  = useState([]);
    const [validate, setValidate] = useState(true);

    const reservacion = JSON.parse(localStorage.getItem('reservacion'));

    const obtenerCampos = (e) => {
        setValidate(true);
		setCliente({
			...cliente,
			[e.target.name]: e.target.value
		});
        
        localStorage.setItem('reservacion', JSON.stringify({...reservacion, [e.target.name]: e.target.value}))
	};


    const consultarDatos = async () => {
		await clienteAxios
			.get(`/company/slug/company/${slug}`)
			.then((res) => {
				setEmpresa(res.data);
			})
			.catch((err) => {
			})
	}

    useEffect(() => {
        consultarDatos();
    }, []);

    const mensaje = ` Hola, me comunico desde *COMODY*, me gustaria solicitar disponibilidad para una reservación, el diay hora:%0A ${!reservacion? "" : reservacion.fechaHora}hrs.%0APara ${!reservacion? "" : reservacion.personas} personas%0AA nombre de: ${!reservacion? "" : reservacion.nombre}`
    
    console.log(cliente);

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
                                // error={!cliente.domicilio && validateDom}
                                defaultValue={reservacion ? reservacion.nombre : ''}
                                // helperText={!cliente.domicilio && validateDom  ? 'Esta campo es requerido' : null}
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
                                // error={!cliente.domicilio && validateDom}
                                defaultValue={reservacion ? reservacion.personas : ''}
                                // helperText={!cliente.domicilio && validateDom  ? 'Esta campo es requerido' : null}
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
}
