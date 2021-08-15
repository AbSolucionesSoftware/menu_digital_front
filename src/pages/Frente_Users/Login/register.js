import { Box, Button, Checkbox, FormControlLabel, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import clienteAxios from '../../../config/axios';
import Comody from '../../../img/Comody.jpeg'

import PropTypes from 'prop-types';
// import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Spin from '../../../components/Spin/spin';
import MessageSnackbar from '../../../components/Snackbar/snackbar';

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
       
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

const useStyles = makeStyles((theme) => ({
	formInputFlex: {
		display: 'flex',
		'& > *': {
			margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`
		},
		'& .obligatorio': {
			color: 'red'
		}
	},
	formInput: {
		margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`
	},
    image: {
		maxHeight: '100%',
		maxWidth: '100%'
	},
	containerImage:{
		width: 180,
		height: 90
	}
}));

export default function Registro(props) {

    const [ registro, setRegistro ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ validate, setValidate ] = useState(false);
    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});
    const classes = useStyles();

    const array = {
        "nameCompany": registro.nombreCompania,
        "nameUser": registro.nameUser,
        "slug": registro.slug,
        "owner": registro.propietario,
        "phone": registro.telefono,
        "password": registro.password,
        "politicas": registro.politicas,
        "repeatPassword": registro.repeatPassword
    }

    const envianDatos = async () => {

        if (!registro.nombreCompania || !registro.propietario
            || !registro.telefono || !registro.slug || !registro.nameUser 
            || !registro.password || !registro.repeatPassword || registro.politicas === false) {
			setValidate(true);
			return;
		}
        setLoading(true);

        await clienteAxios
            .post('/company', array,)
            .then((res) => {
                setLoading(false);
                props.history.push(`/bienvenida`);
                setRegistro([]);
            }
        ).catch((err) => {
            if (err.response) {
                setSnackbar({
                    open: true,
                    mensaje: 'Al parecer el identificador o el nomnbre de usuario que ingresaste ya existe dentro de COMODY',
                    status: 'error'
                });
                setLoading(false);
            }  else {
                setSnackbar({
                    open: true,
                    mensaje: 'Erro en el servidor',
                    status: 'error'
                });
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Grid container justify='center'>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Spin loading={loading} />
            <Paper elevation={3}>
                <Box display="flex" justifyContent="center" alignContent="center" alignItems="center">
                    <Box textAlign='center' p={1} className={classes.containerImage}>  
                        <img className={classes.image} alt="logotipo" src={Comody} />
                    </Box>
                </Box>
                <Box textAlign="center">
                    <Typography variant="h5">
                        Forma parte de COMODY
                    </Typography>
                </Box>
                <Box textAlign="center" p={1}>
                    <Typography >
                        Completa el siguiente formulario para poder crear tu propia cuenta de empresa.
                    </Typography>
                </Box>
                <div className={classes.formInputFlex}>
                    <Box width="100%" textAlign="center" p={1}>
                        <TextField
                            fullWidth
                            error={!registro.nombreCompania && validate}
                            helperText={!registro.nombreCompania && validate ? 'Esta campo es requerido' : null}
                            value={registro.nombreCompania ? registro.nombreCompania : ''}
                            id="nombreCompania"
                            name="nombreCompania"
                            label="Nombre de Compañia"
                            placeholder="Nombre de Compañia"
                            multiline
                            className={classes.text}
                            variant="outlined"
                            onChange={(e) =>
                                setRegistro({ ...registro, nombreCompania: e.target.value })
                            }
                        />
                    </Box>
                    <Box width="100%" textAlign="center" p={1}>
                        <TextField
                        fullWidth
                            error={!registro.propietario && validate}
                            helperText={!registro.propietario && validate ? 'Esta campo es requerido' : null}
                            value={registro.propietario ? registro.propietario : ''}
                            className={classes.text}
                            id="propietario"
                            label="Propietario"
                            placeholder="Propietario"
                            multiline
                            variant="outlined"
                            onChange={(e) =>
                                setRegistro({ ...registro, propietario: e.target.value })
                            }
                        />
                    </Box>
                </div>
                <div className={classes.formInputFlex}>
                    <Box width="100%" textAlign="center" p={1}>
                        <TextField
                        fullWidth
                            error={!registro.nameUser && validate}
                            helperText={!registro.nameUser && validate ? 'Esta campo es requerido' : null}
                            value={registro.nameUser ? registro.nameUser : ''}
                            className={classes.text}
                            id="nameUser"
                            label="Nombre de Usuario"
                            placeholder="Nombre de Usuario"
                            multiline
                            variant="outlined"
                            onChange={(e) =>
                                setRegistro({ ...registro, nameUser: e.target.value })
                            }
                        />
                    </Box>
                    <Box width="100%" textAlign="center" p={1}>
                        <TextField
                        fullWidth
                            error={!registro.telefono && validate}
                            helperText={!registro.telefono && validate ? 'Esta campo es requerido' : null}
                            value={registro.telefono ? registro.telefono : ''}
                            className={classes.text}
                            id="telefono"
                            label="Telefono"
                            placeholder="Telefono"
                            multiline
                            variant="outlined"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                            onChange={(e) =>
                                setRegistro({ ...registro, telefono: e.target.value })
                            }
                        />
                    </Box>
                </div>
                <div className={classes.formInputFlex}>
                    <Alert severity="info">
                        Un <b>identificador web</b> esta la forma en la que encontraran tu negocio <br/>
                        Ejemplo: <b>mi-restaurante-de-comida</b> <br/>
                        Evita utilizar signos especiales como acentos y Ñ<br/>
                        Los espacios son sustituidos por guiones automaticamente
                    </Alert>
                </div>
                <Box width="100%" textAlign="center" p={1}>
                    <TextField
                    fullWidth
                        error={!registro.slug && validate}
                        helperText={!registro.slug && validate ? 'Esta campo es requerido' : null}
                        value={registro.slug ? registro.slug : ''}
                        className={classes.text}
                        id="slug"
                        label="Identificador"
                        placeholder="Identificador"
                        multiline
                        variant="outlined"
                        onChange={(e) =>
                            setRegistro({ ...registro, slug: e.target.value.replace(' ', '-').toLowerCase() })
                        }
                    />
                </Box>
                <div className={classes.formInputFlex}>
                <Box width="100%" textAlign="center" p={1}>
                    <TextField
                    fullWidth
                        error={!registro.password && validate}
                        helperText={!registro.password && validate ? 'Esta campo es requerido' : null}
                        value={registro.password ? registro.password : ''}
                        className={classes.text}
                        id="password"
                        label="Contrasena"
                        placeholder="Contrasena"
                        multiline
                        variant="outlined"
                        onChange={(e) =>
                            setRegistro({ ...registro, password: e.target.value })
                        }
                    />
                </Box>
                <Box width="100%" textAlign="center" p={1} >
                    <TextField
                    fullWidth
                        error={!registro.repeatPassword && validate}
                        helperText={!registro.repeatPassword && validate ? 'Esta campo es requerido' : null}
                        value={registro.repeatPassword ? registro.repeatPassword : ''}
                        className={classes.text}
                        id="repeatPassword"
                        label="Repetir Contrasena"
                        placeholder="Repetir Contrasena"
                        multiline
                        variant="outlined"
                        onChange={(e) =>
                            setRegistro({ ...registro, repeatPassword: e.target.value })
                        }
                    />
                </Box>
                </div>
                <div className={classes.formInputFlex}>
                    <Box width="100%" textAlign="center">
                        <Typography>Te invitamos a leer y aceptar nuestras politicas de privacidad</Typography>
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    error={!registro.politicas && validate}
                                    helperText={!registro.politicas && validate ? 'Esta campo es requerido' : null}
                                    name="politicas"
                                    onChange={(e) =>
                                        setRegistro({ ...registro, politicas: e.target.checked })
                                    }
                                />
                            } 
                            label="Politicas de Privacidad" 
                        />
                    </Box>
                </div>
                <div className={classes.formInputFlex}>
                    <Box p={1} width="100%" display="flex" justifyContent="center" textAlign="center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => {
                                envianDatos();
                            }}
                        >
                            Registrarme
                        </Button>
                    </Box>
                </div>
                
            </Paper>
        </Grid>
    )
}
