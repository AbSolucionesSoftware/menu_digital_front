import { Box, Button, Dialog, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MessageSnackbar from '../../../components/Snackbar/snackbar';
import Spin from '../../../components/Spin/spin';
import clienteAxios from '../../../config/axios';

const useStyles = makeStyles((theme) => ({
    text:{
        width: "100%"
    }
}));


export default function Editar_User(props) {
    const {datosEmpresa, setDatosEmpresa} = props;
	const [ control, setControl ] = useState(false);
    const [editar, setEditar] = useState([]);
    const [open, setOpen] = useState(false);
	const [ loading, setLoading ] = useState(false);

    const [password, setPassword] = useState([]); 

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

	const token = localStorage.getItem('token');

	const classes = useStyles();
    // console.log(editar);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const editarDatos = async () => {
	    setLoading(true);
        await clienteAxios
			.put(`/company/${datosEmpresa._id}`, {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
                setLoading(false);
                // setDatosEmpresa(res.data)
                console.log(" si edito ");
                setSnackbar({
					open: true,
					mensaje: 'Usuario editado exitosamente!',
					status: 'success'
				});
			})
			.catch((err) => {
                setLoading(false);
                console.log(" no edito ");
                setSnackbar({
                    open: true,
                    mensaje: 'Al parecer no se a podido conectar al servidor.',
                    status: 'error'
                });
			});
    }

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
                                    // value={monstrarInformacion.nombreCompania}
                                    className={classes.text}
                                    id="nombreCompania"
                                    label="Nombre de Compania"
                                    placeholder="Nombre de Compania"
                                    multiline
                                    variant="outlined"
                                    onChange={(e) =>
                                        setEditar({ ...editar, nombreCompania: e.value })
                                    }
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    // value={datosEmpresa.owner ? datosEmpresa.owner : ''}
                                    defaultValue={datosEmpresa.owner}
                                    className={classes.text}
                                    id="propietario"
                                    label="Propietario"
                                    placeholder="Propietario"
                                    multiline
                                    variant="outlined"
                                    onChange={(e) =>
                                        setEditar({ ...editar, nombreCompania: e.target.value })
                                    }
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.phone}
                                    // value={datosEmpresa.phone ? datosEmpresa.phone : ''}
                                    className={classes.text}
                                    id="telefono"
                                    label="Telefono"
                                    placeholder="Telefono"
                                    multiline
                                    variant="outlined"
                                    onChange={(e) =>
                                        setEditar({ ...editar, nombreCompania: e.target.value })
                                    }
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={datosEmpresa.nameUser}
                                    // value={datosEmpresa.nameUser ? datosEmpresa.nameUser : ''}
                                    className={classes.text}
                                    id="nameUser"
                                    label="Nombre de Usuario"
                                    placeholder="Nombre de Usuario"
                                    multiline
                                    variant="outlined"
                                    onChange={(e) =>
                                        setEditar({ ...editar, nombreCompania: e.target.value })
                                    }
                                />
                            </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Button
                             variant="contained" 
                             color="primary"
                            //  onClick={ () => }
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
                            Cambiar Contrasena
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
                                // defaultValue={datosEmpresa.phone}
                                // value={datosEmpresa.phone ? datosEmpresa.phone : ''}
                                // className={classes.text}
                                id="constrasena"
                                label="Nueva Contraena"
                                placeholder="Nueva Contraena"
                                multiline
                                variant="outlined"
                                onChange={(e) =>
                                    setPassword({ ...password, constrasena: e.target.value })
                                }
                            />
                        </Box>
                    </Box>

                    <Box p={3} textAlign="center" >
                        <Button
                            variant="contained" 
                            color="primary"
                            //  onClick={ () => }
                        >
                            Guardar
                        </Button>
                    </Box>
                    
                </Grid>
            </Dialog>
        </div>
    )
}
