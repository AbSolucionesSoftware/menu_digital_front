import { Box, Button, Dialog, Drawer, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';
import useStyles from '../../styles';


export default function Editar(props) {
    const { empresa, setEmpresas} = props;
	const classes = useStyles();

    const token = localStorage.getItem('token');
	const [ loading, setLoading ] = useState(false);
    const [contrasena, setContrasena] = useState([])

    const [ open, setOpen ] = useState(false);
    const [ dialog, setDialog] = useState(false);

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
            dialogClose();
            setLoading(false);
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
            <Button
                className={classes.boton}
                variant="contained" 
                color="primary"
                type="Link"
                onClick={dialogOpen}
            >
                Editar Contraseña
            </Button>

            <Dialog open={dialog} onClose={dialogClose}>
                <Grid container>
                <Grid item lg={12}>
                    <Box textAlign="center" p={2}>
                        <Typography variant="h4">
                            Editar Contraseña
                        </Typography>
                    </Box>
                </Grid>
                <Grid lg={12}>
                    <Box textAlign="center" p={2}>
                        <Typography variant="h6">
                            Por favor ingrese su nueva Contraseña
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        <Box p={2}>
                            <TextField
                                id="password"
                                label="Nueva Contraseña"
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
                                label="Repetir Contraseña"
                                placeholder="Repetir Contraseña"
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
                    <Box p={3} textAlign="center">
                        <Button
                            variant="contained" 
                            color="secondary"
                            onClick={dialogClose}
                        >
                            Salir
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            </Dialog>

               
        </div>
    )
}