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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    
    console.log(datosEmpresa);
    
    const array = {
        "nameCompany": datosEmpresa.nameCompany,
        "owner": datosEmpresa.owner,
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

    console.log(editar);

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
                                label="Actual Contrasena"
                                placeholder="Actual Contrasena"
                                multiline
                                variant="outlined"
                                onChange={(e) =>
                                    setPassword({ ...password, constrasena: e.target.value })
                                }
                            />
                        </Box>
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
