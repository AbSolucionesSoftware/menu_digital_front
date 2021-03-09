import { Box, Button, Drawer } from '@material-ui/core';
import React, { useState } from 'react'
import MessageSnackbar from '../../../../components/Snackbar/snackbar';
import Spin from '../../../../components/Spin/spin';
import clienteAxios from '../../../../config/axios';
import Editar_User from '../../../Users/PanelUsuario/editar_user';


export default function Editar(props) {
    const { empresa } = props;
    const token = localStorage.getItem('token');
	const [ loading, setLoading ] = useState(false);

    const [ open, setOpen ] = useState(false);

    const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

    const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});

    const editarDatos = async (empresa) => {
        setLoading(true);
        clienteAxios
        .put(
            `/company/${empresa}`,
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }
        )
        .then((res) => {
            setLoading(false);
            // setReload(!reload);
            setSnackbar({
                open: true,
                mensaje: "Usuario editado exitosamente!.",
                status: 'success'
            });
        })
        .catch((err) => {
            setLoading(false);
            setSnackbar({
                open: true,
                mensaje: "Ocurrio un problema en el servidor.",
                status: 'error'
            });
            // errors(err);
        });
    };

    return (
        <div>
            <Spin loading={loading} />
            <MessageSnackbar
				open={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
            <Button
                // className={classes.boton} 
                variant="contained" 
                color="primary"
                type="Link"
                onClick={handleDrawerOpen}
            >
                Editar
            </Button>

            <Drawer
                // className={classes.drawer}
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <Editar_User datosEmpresa={empresa} />
                <Box textAlign="center" mt={4}>
                    <Button
                        variant="contained" 
                        color="secondary"
                        size="large"
                        onClick={handleDrawerClose}
                    >
                        Salir
                    </Button>
                </Box>
            </Drawer>
        </div>
    )
}