import { Box, Button, Dialog, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';

import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

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

const useStyles = makeStyles((theme) => ({
    text:{
        width: "100%"
    }
}));


export default function Editar_User(props) {
    const {handleDrawerClose, datosEmpresa, setDatosEmpresa, setUpload} = props;
	const [ control, setControl ] = useState(false);
    const [editar, setEditar] = useState([]);
    const [open, setOpen] = useState(false);
	const [ loading, setLoading ] = useState(false);

    const [contrasena, setContrasena] = useState([]); 

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const token = localStorage.getItem('token');

	const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const array = {
        "nameCompany": datosEmpresa.nameCompany,
        "owner": datosEmpresa.owner,
        "slug": datosEmpresa.slug,
        "phone": datosEmpresa.phone,
    }

    const editarDatos = async () => {
	    setLoading(true);
        await clienteAxios
			.put(`/company/${datosEmpresa._id}`, array, 
            {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                setLoading(false);
                handleDrawerClose();
                setUpload(true);
                // setDatosEmpresa(res.data)
                setSnackbar({
					open: true,
					mensaje: 'Usuario editado exitosamente!',
					status: 'success'
				});
			})
			.catch((err) => {
                setLoading(false);
                setSnackbar({
                    open: true,
                    mensaje: 'Al parecer no se a podido conectar al servidor.',
                    status: 'error'
                });
			});
    }

    const newPass = { 
        "currentPassword": contrasena.currentPassword,
        "password": contrasena.password,
        "repeatPassword" : contrasena.repeatPassword
    }

    const cambiarPassword = async (empresa) => {
        setLoading(true);
        clienteAxios
        .put(
            `/company/resetPass/user/${empresa._id}`, newPass,
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }
        )
        .then((res) => {
            setLoading(false);
            handleClose()
            setSnackbar({
                open: true,
                mensaje: 'Contraseña editada exitosamente!',
                status: 'success'
            });

        }).catch((err) => {
            setLoading(false);
            setSnackbar({
                open: true,
                mensaje: err.response.data.message,
                status: 'error'
            });

        });
    };


    return (
        <div>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
			<Spin loading={loading} />
            <Grid container>
                <Grid item lg={12}>
                    <Box textAlign="center" p={5}>
                        <Typography variant="h4">
                            Editar Datos
                        </Typography>
                    </Box>
                </Grid>
                <Grid lg={12}>
                    <Box mt={5} textAlign="center">
                            <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.nameCompany}
                                    className={classes.text}
                                    id="nameCompany"
                                    label="Nombre de Compania"
                                    placeholder="Nombre de Compania"
                                    multiline
                                    variant="outlined"
                                    onChange={(e) =>
                                        setDatosEmpresa({ ...datosEmpresa, nameCompany: e.target.value })
                                    }
                                />
                            </Box>
                            <Box p={1} display="flex" justifyContent="center" flexWrap="wrap">
                                <Alert severity="info">Un identificador para poder distinguir tu Negocio en el navegador</Alert>
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.slug}
                                    className={classes.text}
                                    id="slug"
                                    label="Identificador"
                                    placeholder="Identificador"
                                    multiline
                                    variant="outlined"
                                    onChange={(e) =>
                                        setDatosEmpresa({ ...datosEmpresa, slug: e.target.value.replace(' ', '-').toLowerCase()})
                                    }
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.owner}
                                    className={classes.text}
                                    id="owner"
                                    label="Propietario"
                                    placeholder="Propietario"
                                    multiline
                                    variant="outlined"
                                    onChange={(e) =>
                                        setDatosEmpresa({ ...datosEmpresa, owner: e.target.value })
                                    }
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.phone}
                                    className={classes.text}
                                    id="phone"
                                    label="Telefono"
                                    placeholder="Telefono"
                                    multiline
                                    variant="outlined"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                    onChange={(e) =>
                                        setDatosEmpresa({ ...datosEmpresa, phone: e.target.value })
                                    }
                                />
                            </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Button
                             variant="contained" 
                             color="primary"
                             onClick={ () => editarDatos()}
                        >
                            Guardar
                        </Button>
                    </Box>
                    <Box p={3} textAlign="center">
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={handleClickOpen}
                        >
                            Cambiar Contraseña
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <Grid lg={12}>
                    <Box p={3}>
                        <Typography variant="h6">
                            Por favor ingrese su nueva contrasena
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Box p={2}>
                            <TextField
                                id="currentPassword"
                                label="Contraseña Actual"
                                placeholder="Contraseña Actual"
                                multiline
                                variant="outlined"
                                onChange={(e) =>
                                    setContrasena({ ...contrasena, currentPassword: e.target.value })
                                }
                            />
                        </Box>
                        <Box p={2}>
                            <TextField
                                id="password"
                                label="Nueva Contraeña"
                                placeholder="Nueva Contraseña"
                                multiline
                                variant="outlined"
                                onChange={(e) =>
                                    setContrasena({ ...contrasena, password: e.target.value })
                                }
                            />
                        </Box>
                        <Box p={2}>
                            <TextField
                                id="repeatPassword"
                                label="Repetir Contrasena"
                                placeholder="Repetir Contrasena"
                                multiline
                                variant="outlined"
                                onChange={(e) =>
                                    setContrasena({ ...contrasena, repeatPassword: e.target.value })
                                }
                            />
                        </Box>
                    </Box>

                    <Box p={3} textAlign="center" >
                        <Button
                            variant="contained" 
                            color="primary"
                             onClick={ () => cambiarPassword(datosEmpresa)}
                        >
                            Guardar
                        </Button>
                    </Box>
                    
                </Grid>
            </Dialog>
        </div>
    )
}
