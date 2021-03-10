import { Box, Button, Dialog, Drawer, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';

const useStyles = makeStyles((theme) => ({
    text:{
        width: "100%"
    }
}));

export default function Editar(props) {
    const { empresa } = props;
    console.log(empresa);
	const classes = useStyles();

    const token = localStorage.getItem('token');
	const [ loading, setLoading ] = useState(false);
    const [contrasena, setContrasena] = useState([])

    const [ open, setOpen ] = useState(false);
    const [ dialog, setDialog] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dialogOpen = () => {
        setDialog(true);
    };

    const dialogClose = () => {
        setDialog(false);
    };

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const newPass ={
        "password": contrasena.password,
        "repeatPassword": contrasena.repeatPassword ,
    }


    const cambiarPassword = async (empresa) => {
        setLoading(true);
        console.log(empresa._id);
        console.log(newPass);
        clienteAxios
        .put(
            `/company/resetPass/${empresa._id}`, newPass,
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }
        )
        .then((res) => {
            console.log("Si cambio tu contrasena");
            setSnackbar({
                open: true,
                mensaje: 'Contrasena! editada exitosamente!',
                status: 'success'
            });

        }).catch((err) => {
            console.log("No cambio tu contrasena");
            console.log(err.response);
            setSnackbar({
                open: true,
                mensaje: 'No se pudo actualizar su contrasena!',
                status: 'error'
            });

        });
    };
    console.log(newPass);

    // const array = {
    //     "nameCompany": empresa.nameCompany,
    //     "owner": empresa.owner,
    //     "phone": empresa.phone,
    // }

    // const editarDatos = async (empresa) => {
	//     setLoading(true);
    //     await clienteAxios
	// 		.put(`/company/${empresa._id}`, array, 
    //         {
	// 			headers: {
	// 				Authorization: `bearer ${token}`
	// 			}
	// 		})
	// 		.then((res) => {
    //             setLoading(false);
    //             console.log(" si edito ");
    //             setSnackbar({
	// 				open: true,
	// 				mensaje: 'Usuario editado exitosamente!',
	// 				status: 'success'
	// 			});
	// 		})
	// 		.catch((err) => {
    //             setLoading(false);
    //             console.log(" no edito ");
    //             setSnackbar({
    //                 open: true,
    //                 mensaje: 'Al parecer no se a podido conectar al servidor.',
    //                 status: 'error'
    //             });
	// 		});
    // }

    return (
        <div>
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Spin loading={loading} />
            <Button
                variant="contained" 
                color="primary"
                type="Link"
                onClick={handleClickOpen}
            >
                Editar
            </Button>

            <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
            >
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
                                    defaultValue={empresa.nameCompany}
                                    className={classes.text}
                                    id="nameCompany"
                                    label="Nombre de Compania"
                                    placeholder="Nombre de Compania"
                                    multiline
                                    variant="outlined"
                                    // onChange={(e) =>
                                    //     setEmpresas({ ...empresa, nameCompany: e.target.value })
                                    // }
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={empresa.owner}
                                    className={classes.text}
                                    id="owner"
                                    label="Propietario"
                                    placeholder="Propietario"
                                    multiline
                                    variant="outlined"
                                    // onChange={(e) =>
                                    //     setEmpresas({ ...empresa, owner: e.target.value })
                                    // }
                                />
                            </Box>
                            <Box p={2}>
                                <TextField
                                    defaultValue={empresa.phone}
                                    className={classes.text}
                                    id="phone"
                                    label="Telefono"
                                    placeholder="Telefono"
                                    multiline
                                    variant="outlined"
                                    // onChange={(e) =>
                                    //     setEmpresas({ ...empresa, phone: e.target.value })
                                    // }
                                />
                            </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Button
                             variant="contained" 
                             color="primary"
                            //  onClick={() => editarDatos(empresa)}
                        >
                            Actualizar
                        </Button>
                    </Box>
                    <Box p={3} textAlign="center">
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={dialogOpen}
                        >
                            Cambiar Contrasena
                        </Button>
                    </Box>
                    <Box p={3} textAlign="center">
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={handleClose}
                        >
                            Salir
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            </Drawer>

            {/* CAMBIOS DE CONTRASE;A */}
            <Dialog open={dialog} onClose={dialogClose}>
                <Grid lg={12}>
                    <Box p={3}>
                        <Typography variant="h6">
                            Por favor ingrese su nueva contrasena
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Box p={2}>
                            <TextField
                                id="password"
                                label="Nueva Contraena"
                                placeholder="Nueva Contraena"
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
                                label="Repetir Contraena"
                                placeholder="Repetir Contraena"
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
                             onClick={ () => cambiarPassword(empresa) }
                        >
                            Guardar
                        </Button>
                    </Box>
                    
                </Grid>
            </Dialog>
        </div>
    )
}